/**
 * @jest-environment node
 */
import mongoose from 'mongoose';
import Service from '../Service';

describe('Service Model', () => {
  describe('Schema Validation', () => {
    it('should create a valid service', () => {
      const validService = {
        title: 'Web Development',
        description: 'Professional web development services',
        category: 'development',
        price: 2000,
        active: true,
      };

      const service = new Service(validService);
      const error = service.validateSync();

      expect(error).toBeUndefined();
      expect(service.title).toBe(validService.title);
      expect(service.category).toBe(validService.category);
      expect(service.price).toBe(validService.price);
    });

    it('should require title field', () => {
      const serviceWithoutTitle = {
        description: 'Test description',
        category: 'consulting',
        price: 1500,
      };

      const service = new Service(serviceWithoutTitle);
      const error = service.validateSync();

      expect(error).toBeDefined();
      expect(error?.errors.title).toBeDefined();
    });

    it('should require description field', () => {
      const serviceWithoutDescription = {
        title: 'Test Service',
        category: 'marketing',
        price: 1000,
      };

      const service = new Service(serviceWithoutDescription);
      const error = service.validateSync();

      expect(error).toBeDefined();
      expect(error?.errors.description).toBeDefined();
    });

    it('should require category field', () => {
      const serviceWithoutCategory = {
        title: 'Test Service',
        description: 'Test description',
        price: 1000,
      };

      const service = new Service(serviceWithoutCategory);
      const error = service.validateSync();

      expect(error).toBeDefined();
      expect(error?.errors.category).toBeDefined();
    });

    it('should validate category enum values', () => {
      const serviceWithInvalidCategory = {
        title: 'Test Service',
        description: 'Test description',
        category: 'invalid-category',
        price: 1000,
      };

      const service = new Service(serviceWithInvalidCategory);
      const error = service.validateSync();

      expect(error).toBeDefined();
      expect(error?.errors.category).toBeDefined();
    });

    it('should accept valid category values', () => {
      const categories = ['consulting', 'development', 'marketing'];

      categories.forEach((category) => {
        const service = new Service({
          title: 'Test Service',
          description: 'Test description',
          category,
          price: 1000,
        });

        const error = service.validateSync();
        expect(error).toBeUndefined();
      });
    });

    it('should require price field', () => {
      const serviceWithoutPrice = {
        title: 'Test Service',
        description: 'Test description',
        category: 'consulting',
      };

      const service = new Service(serviceWithoutPrice);
      const error = service.validateSync();

      expect(error).toBeDefined();
      expect(error?.errors.price).toBeDefined();
    });

    it('should not accept negative price', () => {
      const serviceWithNegativePrice = {
        title: 'Test Service',
        description: 'Test description',
        category: 'consulting',
        price: -100,
      };

      const service = new Service(serviceWithNegativePrice);
      const error = service.validateSync();

      expect(error).toBeDefined();
      expect(error?.errors.price).toBeDefined();
    });

    it('should default active to true', () => {
      const service = new Service({
        title: 'Test Service',
        description: 'Test description',
        category: 'consulting',
        price: 1000,
      });

      expect(service.active).toBe(true);
    });

    it('should trim title and description', () => {
      const service = new Service({
        title: '  Web Development  ',
        description: '  Test description  ',
        category: 'development',
        price: 2000,
      });

      expect(service.title).toBe('Web Development');
      expect(service.description).toBe('Test description');
    });
  });
});
