import { BadRequestException, NotFoundException } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Product } from "@products-app/schemas";
import { Model } from "mongoose";
import { mockProductDto, productMock } from "../../test/mocks/product";
import { DatabaseModule } from "../database/database.module";
import { userProviders } from "../user/user.providers";
import { ProductModule } from "./product.module";
import { productProviders } from "./product.providers";
import { ProductService } from "./product.service";

const mockProductModel = {
  find: jest.fn().mockReturnValueOnce({
    limit: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    sort: jest.fn().mockResolvedValueOnce([productMock]),
  }),
  findOne: jest.fn().mockReturnValue({
    exec: jest.fn()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(productMock)
      .mockResolvedValueOnce(productMock)
      .mockResolvedValueOnce(null)
      .mockResolvedValue(null)
  }),
  countDocuments: jest.fn().mockReturnThis().mockReturnValue({
    exec: jest.fn().mockResolvedValueOnce(1),
  }),
  create: jest.fn().mockResolvedValue(productMock),
  findOneAndUpdate: jest.fn().mockReturnValueOnce({
    exec: jest.fn()
      .mockResolvedValueOnce(productMock)
      .mockResolvedValueOnce(productMock),
  }),
};

describe('Product Service', () => {
  let service: ProductService;
  let model: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        ProductModule,
      ],
      providers: [
        ProductService,
        ...productProviders,
        ...userProviders,
        {
          provide: getModelToken("PRODUCT_MODEL"),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    model = module.get<Model<Product>>(getModelToken("PRODUCT_MODEL"));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await service.findAll({
        orderBy: 'updatedAt',
        page: '1',
        perPage: '10',
        search: '',
        sort: 'desc',
      });
      expect(result.data).toEqual([productMock]);
      expect(result.total).toEqual(1);
    });
  });

  describe('create', () => {
    it('should create a product successfully', async () => {
      const result = await service.create(mockProductDto);
      expect(result).toEqual(productMock);
    });

    it('should throw BadRequestException if name already exists', async () => {
      await expect(service.create(mockProductDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const result = await service.findOne('test-product');
      expect(result).toEqual(productMock);
    });

    it('should throw NotFoundException if product is not found', async () => {
      await expect(service.findOne('non-existing-slug')).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should mark a product as deleted', async () => {
      const result = await service.delete('test-product');
      expect(result).toEqual(productMock);
    });
  });

  describe.skip('update', () => {
    it('should update a product successfully', async () => {
      const result = await service.update('test-product', mockProductDto);
      expect(result).toEqual(productMock);
    });
  });
})