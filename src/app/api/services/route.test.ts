/**
 * @jest-environment node
 */
import { GET } from './route';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

// Mock dependencies
jest.mock('@/lib/mongodb');
jest.mock('@/models/Service');

describe('GET /api/services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return services successfully', async () => {
    const mockServices = [
      {
        _id: '1',
        title: 'Test Service',
        description: 'Test Description',
        category: 'development',
        price: 1000,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (connectDB as jest.Mock).mockResolvedValue(undefined);
    (Service.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockServices),
      }),
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.count).toBe(1);
    expect(data.services).toHaveLength(1);
    expect(data.services[0].title).toBe('Test Service');
  });

  it('should return empty array when no services found', async () => {
    (connectDB as jest.Mock).mockResolvedValue(undefined);
    (Service.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue([]),
      }),
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.count).toBe(0);
    expect(data.services).toHaveLength(0);
  });

  it('should handle database errors', async () => {
    (connectDB as jest.Mock).mockRejectedValue(new Error('Database connection failed'));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Failed to fetch services');
  });

  it('should only return active services', async () => {
    (connectDB as jest.Mock).mockResolvedValue(undefined);

    await GET();

    expect(Service.find).toHaveBeenCalledWith({ active: true });
  });
});
