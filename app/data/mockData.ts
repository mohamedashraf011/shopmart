// Mock data for Live Sales Feed and Popular Products
export const mockRecentOrders = [
    {
        _id: 'mock1',
        cartItems: [{
            _id: 'item1',
            count: 2,
            price: 1299,
            product: {
                _id: 'prod1',
                title: 'iPhone 15 Pro Max 256GB Natural Titanium',
                imageCover: 'https://ecommerce.routemisr.com/Route-Ecommerce/images/products/1680403397482-1.jpeg',
                category: { name: 'Electronics' },
                brand: { name: 'Apple' }
            }
        }],
        totalOrderPrice: 2598,
        paymentMethodType: 'card',
        isPaid: true,
        isDelivered: false,
        createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
        shippingAddress: {
            details: 'Downtown',
            phone: '01012345678',
            city: 'Cairo'
        }
    },
    {
        _id: 'mock2',
        cartItems: [{
            _id: 'item2',
            count: 1,
            price: 899,
            product: {
                _id: 'prod2',
                title: 'Samsung Galaxy S24 Ultra 512GB Titanium Black',
                imageCover: 'https://ecommerce.routemisr.com/Route-Ecommerce/images/products/1680403397482-2.jpeg',
                category: { name: 'Electronics' },
                brand: { name: 'Samsung' }
            }
        }],
        totalOrderPrice: 899,
        paymentMethodType: 'cash',
        isPaid: false,
        isDelivered: false,
        createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(), // 12 minutes ago
        shippingAddress: {
            details: 'Maadi',
            phone: '01098765432',
            city: 'Cairo'
        }
    },
    {
        _id: 'mock3',
        cartItems: [
            {
                _id: 'item3',
                count: 1,
                price: 599,
                product: {
                    _id: 'prod3',
                    title: 'Nike Air Max 270 React Black White',
                    imageCover: 'https://ecommerce.routemisr.com/Route-Ecommerce/images/products/1680403397482-3.jpeg',
                    category: { name: 'Fashion' },
                    brand: { name: 'Nike' }
                }
            },
            {
                _id: 'item4',
                count: 2,
                price: 299,
                product: {
                    _id: 'prod4',
                    title: 'Adidas Ultraboost 22 Running Shoes',
                    imageCover: 'https://ecommerce.routemisr.com/Route-Ecommerce/images/products/1680403397482-4.jpeg',
                    category: { name: 'Fashion' },
                    brand: { name: 'Adidas' }
                }
            }
        ],
        totalOrderPrice: 1197,
        paymentMethodType: 'card',
        isPaid: true,
        isDelivered: true,
        createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 minutes ago
        shippingAddress: {
            details: 'New Cairo',
            phone: '01123456789',
            city: 'Cairo'
        }
    },
    {
        _id: 'mock4',
        cartItems: [{
            _id: 'item5',
            count: 1,
            price: 2499,
            product: {
                _id: 'prod5',
                title: 'MacBook Pro 14-inch M3 Pro 512GB Space Black',
                imageCover: 'https://ecommerce.routemisr.com/Route-Ecommerce/images/products/1680403397482-5.jpeg',
                category: { name: 'Electronics' },
                brand: { name: 'Apple' }
            }
        }],
        totalOrderPrice: 2499,
        paymentMethodType: 'card',
        isPaid: true,
        isDelivered: false,
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
        shippingAddress: {
            details: 'Zamalek',
            phone: '01087654321',
            city: 'Cairo'
        }
    },
    {
        _id: 'mock5',
        cartItems: [{
            _id: 'item6',
            count: 3,
            price: 199,
            product: {
                _id: 'prod6',
                title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
                imageCover: 'https://ecommerce.routemisr.com/Route-Ecommerce/images/products/1680403397482-6.jpeg',
                category: { name: 'Electronics' },
                brand: { name: 'Sony' }
            }
        }],
        totalOrderPrice: 597,
        paymentMethodType: 'cash',
        isPaid: false,
        isDelivered: false,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
        shippingAddress: {
            details: 'Heliopolis',
            phone: '01156789012',
            city: 'Cairo'
        }
    },
    {
        _id: 'mock6',
        cartItems: [{
            _id: 'item7',
            count: 1,
            price: 799,
            product: {
                _id: 'prod7',
                title: 'Canon EOS R6 Mark II Mirrorless Camera Body',
                imageCover: 'https://ecommerce.routemisr.com/Route-Ecommerce/images/products/1680403397482-7.jpeg',
                category: { name: 'Electronics' },
                brand: { name: 'Canon' }
            }
        }],
        totalOrderPrice: 799,
        paymentMethodType: 'card',
        isPaid: true,
        isDelivered: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        shippingAddress: {
            details: 'Dokki',
            phone: '01234567890',
            city: 'Giza'
        }
    }
];

export const mockPopularProducts = [
    {
        productId: 'prod1',
        title: 'iPhone 15 Pro Max 256GB Natural Titanium',
        imageCover: 'https://ecommerce.routemisr.com/Route-Ecommerce/images/products/1680403397482-1.jpeg',
        brand: 'Apple',
        category: 'Electronics',
        totalSold: 45,
        totalRevenue: 58455
    },
    {
        productId: 'prod2',
        title: 'Samsung Galaxy S24 Ultra 512GB Titanium Black',
        imageCover: 'https://ecommerce.routemisr.com/Route-Ecommerce/images/products/1680403397482-2.jpeg',
        brand: 'Samsung',
        category: 'Electronics',
        totalSold: 38,
        totalRevenue: 34162
    },
    {
        productId: 'prod3',
        title: 'Nike Air Max 270 React Black White',
        imageCover: 'https://ecommerce.routemisr.com/Route-Ecommerce/images/products/1680403397482-3.jpeg',
        brand: 'Nike',
        category: 'Fashion',
        totalSold: 32,
        totalRevenue: 19168
    },
    {
        productId: 'prod5',
        title: 'MacBook Pro 14-inch M3 Pro 512GB Space Black',
        imageCover: 'https://ecommerce.routemisr.com/Route-Ecommerce/images/products/1680403397482-5.jpeg',
        brand: 'Apple',
        category: 'Electronics',
        totalSold: 28,
        totalRevenue: 69972
    },
    {
        productId: 'prod6',
        title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
        imageCover: 'https://ecommerce.routemisr.com/Route-Ecommerce/images/products/1680403397482-6.jpeg',
        brand: 'Sony',
        category: 'Electronics',
        totalSold: 25,
        totalRevenue: 4975
    },
    {
        productId: 'prod4',
        title: 'Adidas Ultraboost 22 Running Shoes',
        imageCover: 'https://ecommerce.routemisr.com/Route-Ecommerce/images/products/1680403397482-4.jpeg',
        brand: 'Adidas',
        category: 'Fashion',
        totalSold: 22,
        totalRevenue: 6578
    }
];