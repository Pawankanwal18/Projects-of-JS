// ============================================================
// QuickBite — Mock Data
// All restaurant, menu, category, promo, and city data.
// Edit this file to add/remove restaurants and dishes.
// ============================================================

const cities = [
  { id: 1, name: "Mumbai", areas: ["Andheri", "Bandra", "Juhu", "Powai", "Dadar", "Colaba"] },
  { id: 2, name: "Delhi", areas: ["Connaught Place", "Hauz Khas", "Saket", "Karol Bagh", "Dwarka"] },
  { id: 3, name: "Bangalore", areas: ["Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "MG Road"] },
  { id: 4, name: "Hyderabad", areas: ["Banjara Hills", "Jubilee Hills", "Madhapur", "Gachibowli", "Secunderabad"] },
  { id: 5, name: "Chennai", areas: ["T. Nagar", "Anna Nagar", "Adyar", "Velachery", "ECR"] },
  { id: 6, name: "Pune", areas: ["Koregaon Park", "Viman Nagar", "Hinjewadi", "Kothrud", "FC Road"] },
];

const cuisineCategories = [
  { id: "north-indian", name: "North Indian", icon: "🍛" },
  { id: "south-indian", name: "South Indian", icon: "🥘" },
  { id: "chinese", name: "Chinese", icon: "🥡" },
  { id: "biryani", name: "Biryani", icon: "🍚" },
  { id: "pizza", name: "Pizza", icon: "🍕" },
  { id: "burgers", name: "Burgers", icon: "🍔" },
  { id: "desserts", name: "Desserts", icon: "🍰" },
  { id: "street-food", name: "Street Food", icon: "🌮" },
  { id: "italian", name: "Italian", icon: "🍝" },
  { id: "mughlai", name: "Mughlai", icon: "🥙" },
  { id: "rolls", name: "Rolls", icon: "🌯" },
  { id: "ice-cream", name: "Ice Cream", icon: "🍦" },
];

const promoBanners = [
  {
    id: 1,
    title: "60% OFF up to ₹120",
    subtitle: "On your first order",
    code: "WELCOME60",
    gradient: "linear-gradient(135deg, #FF4D29 0%, #FF8C00 100%)",
    emoji: "🎉",
  },
  {
    id: 2,
    title: "Free Delivery",
    subtitle: "On orders above ₹199",
    code: "FREEDEL",
    gradient: "linear-gradient(135deg, #6C63FF 0%, #3F3D9E 100%)",
    emoji: "🚀",
  },
  {
    id: 3,
    title: "Flat ₹100 OFF",
    subtitle: "On orders above ₹499",
    code: "FLAT100",
    gradient: "linear-gradient(135deg, #00B894 0%, #00796B 100%)",
    emoji: "💥",
  },
  {
    id: 4,
    title: "Snack Time Deal",
    subtitle: "Buy 1 Get 1 on Starters",
    code: "BOGO",
    gradient: "linear-gradient(135deg, #E84393 0%, #A855F7 100%)",
    emoji: "🍟",
  },
];

const restaurants = [
  {
    id: 1,
    name: "Punjab Grill",
    cuisine: ["North Indian", "Mughlai"],
    rating: 4.4,
    deliveryTime: "30-35 mins",
    deliveryMinutes: 32,
    priceForTwo: 450,
    isPureVeg: false,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=400&fit=crop",
    address: "Shop 12, Sector 5, Koramangala",
    menu: [
      {
        category: "Starters",
        items: [
          { id: 101, name: "Paneer Tikka", price: 220, isVeg: true, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=300&fit=crop", description: "Soft paneer cubes marinated in spices, grilled to perfection in a tandoor" },
          { id: 102, name: "Chicken Seekh Kebab", price: 280, isVeg: false, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=300&fit=crop", description: "Minced chicken blended with herbs and spices, char-grilled on skewers" },
          { id: 103, name: "Amritsari Fish Fry", price: 320, isVeg: false, image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&h=300&fit=crop", description: "Crispy fried fish fillets coated with traditional Amritsari batter" },
          { id: 104, name: "Dahi Ke Kebab", price: 190, isVeg: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=300&fit=crop", description: "Creamy hung curd kebabs with cashews, shallow fried till golden" },
        ]
      },
      {
        category: "Main Course",
        items: [
          { id: 105, name: "Butter Chicken", price: 340, isVeg: false, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=300&fit=crop", description: "Tender chicken in rich tomato-butter gravy, a timeless classic" },
          { id: 106, name: "Dal Makhani", price: 260, isVeg: true, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=300&fit=crop", description: "Black lentils slow-cooked overnight with butter and cream" },
          { id: 107, name: "Rogan Josh", price: 360, isVeg: false, image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=300&h=300&fit=crop", description: "Aromatic Kashmiri lamb curry with rich red gravy" },
          { id: 108, name: "Paneer Butter Masala", price: 280, isVeg: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop", description: "Cottage cheese cubes in creamy tomato-cashew gravy" },
          { id: 109, name: "Garlic Naan", price: 60, isVeg: true, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop", description: "Soft leavened bread topped with fresh garlic and butter" },
          { id: 110, name: "Jeera Rice", price: 160, isVeg: true, image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=300&h=300&fit=crop", description: "Fragrant basmati rice tempered with cumin seeds" },
        ]
      },
      {
        category: "Desserts",
        items: [
          { id: 111, name: "Gulab Jamun", price: 120, isVeg: true, image: "https://images.unsplash.com/photo-1666190461891-47a5437b3846?w=300&h=300&fit=crop", description: "Soft milk dumplings soaked in rose-cardamom sugar syrup" },
          { id: 112, name: "Rasmalai", price: 150, isVeg: true, image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=300&h=300&fit=crop", description: "Spongy cheese patties in chilled saffron-pistachio milk" },
        ]
      },
    ],
  },
  {
    id: 2,
    name: "Dosa Plaza",
    cuisine: ["South Indian"],
    rating: 4.2,
    deliveryTime: "25-30 mins",
    deliveryMinutes: 27,
    priceForTwo: 300,
    isPureVeg: true,
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&h=400&fit=crop",
    address: "14, MG Road, Indiranagar",
    menu: [
      {
        category: "Dosas",
        items: [
          { id: 201, name: "Masala Dosa", price: 120, isVeg: true, image: "https://images.unsplash.com/photo-1668236543090-82eb5eada026?w=300&h=300&fit=crop", description: "Crispy golden crepe filled with spiced potato masala, served with chutneys and sambar" },
          { id: 202, name: "Mysore Masala Dosa", price: 150, isVeg: true, image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=300&fit=crop", description: "Spicy red chutney-smeared dosa with potato filling" },
          { id: 203, name: "Rava Dosa", price: 130, isVeg: true, image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=300&h=300&fit=crop", description: "Crispy semolina crepe with onions and green chillies" },
          { id: 204, name: "Paper Roast Dosa", price: 140, isVeg: true, image: "https://images.unsplash.com/photo-1668236543090-82eb5eada026?w=300&h=300&fit=crop", description: "Wafer-thin crispy dosa, golden and crunchy" },
        ]
      },
      {
        category: "Idli & Vada",
        items: [
          { id: 205, name: "Idli Sambar (4 pcs)", price: 90, isVeg: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=300&fit=crop", description: "Steamed rice cakes served with hot sambar and coconut chutney" },
          { id: 206, name: "Medu Vada (2 pcs)", price: 80, isVeg: true, image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=300&h=300&fit=crop", description: "Crispy urad dal fritters, golden and crunchy outside, soft inside" },
          { id: 207, name: "Curd Vada (2 pcs)", price: 100, isVeg: true, image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=300&h=300&fit=crop", description: "Soft vadas soaked in seasoned yogurt topped with chutneys" },
        ]
      },
      {
        category: "Beverages",
        items: [
          { id: 208, name: "Filter Coffee", price: 50, isVeg: true, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop", description: "Traditional South Indian filter coffee brewed fresh" },
          { id: 209, name: "Mango Lassi", price: 90, isVeg: true, image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=300&h=300&fit=crop", description: "Thick and creamy mango yogurt smoothie" },
        ]
      },
    ],
  },
  {
    id: 3,
    name: "Dragon Wok",
    cuisine: ["Chinese", "Thai"],
    rating: 4.1,
    deliveryTime: "35-40 mins",
    deliveryMinutes: 37,
    priceForTwo: 500,
    isPureVeg: false,
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=400&fit=crop",
    address: "45, Brigade Road, MG Road",
    menu: [
      {
        category: "Starters",
        items: [
          { id: 301, name: "Veg Manchurian Dry", price: 200, isVeg: true, image: "https://images.unsplash.com/photo-1645696996986-3bff8a801c74?w=300&h=300&fit=crop", description: "Crispy vegetable balls tossed in spicy manchurian sauce" },
          { id: 302, name: "Chicken 65", price: 260, isVeg: false, image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=300&h=300&fit=crop", description: "Deep-fried spicy chicken bites with curry leaves and chilli" },
          { id: 303, name: "Spring Rolls (4 pcs)", price: 180, isVeg: true, image: "https://images.unsplash.com/photo-1548507200-b4b8e46e92d1?w=300&h=300&fit=crop", description: "Crispy rolls stuffed with seasoned vegetables" },
          { id: 304, name: "Chilli Prawns", price: 340, isVeg: false, image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=300&h=300&fit=crop", description: "Juicy prawns wok-tossed with bell peppers in chilli sauce" },
        ]
      },
      {
        category: "Main Course",
        items: [
          { id: 305, name: "Veg Fried Rice", price: 200, isVeg: true, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=300&fit=crop", description: "Stir-fried rice with mixed vegetables and soy sauce" },
          { id: 306, name: "Chicken Hakka Noodles", price: 260, isVeg: false, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop", description: "Wok-tossed noodles with chicken and vegetables" },
          { id: 307, name: "Schezwan Paneer", price: 280, isVeg: true, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop", description: "Paneer cubes in fiery Schezwan sauce with peppers" },
          { id: 308, name: "Thai Green Curry", price: 320, isVeg: false, image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&h=300&fit=crop", description: "Coconut milk curry with Thai basil, chicken, and vegetables" },
        ]
      },
      {
        category: "Desserts",
        items: [
          { id: 309, name: "Fried Ice Cream", price: 160, isVeg: true, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop", description: "Crispy coated vanilla ice cream ball, served with chocolate sauce" },
        ]
      },
    ],
  },
  {
    id: 4,
    name: "Biryani Blues",
    cuisine: ["Biryani", "Mughlai"],
    rating: 4.5,
    deliveryTime: "40-45 mins",
    deliveryMinutes: 42,
    priceForTwo: 550,
    isPureVeg: false,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&h=400&fit=crop",
    address: "78, Jubilee Hills, Road No. 36",
    menu: [
      {
        category: "Biryanis",
        items: [
          { id: 401, name: "Hyderabadi Chicken Biryani", price: 320, isVeg: false, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=300&fit=crop", description: "Slow-cooked dum biryani with tender chicken, fragrant basmati, and saffron" },
          { id: 402, name: "Mutton Biryani", price: 380, isVeg: false, image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=300&h=300&fit=crop", description: "Rich and aromatic mutton biryani cooked on slow fire" },
          { id: 403, name: "Veg Dum Biryani", price: 240, isVeg: true, image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=300&h=300&fit=crop", description: "Layered vegetable biryani with mint, saffron, and fried onions" },
          { id: 404, name: "Egg Biryani", price: 260, isVeg: false, image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=300&h=300&fit=crop", description: "Fragrant rice layered with spiced boiled eggs and masala" },
        ]
      },
      {
        category: "Starters",
        items: [
          { id: 405, name: "Chicken Tikka", price: 260, isVeg: false, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=300&fit=crop", description: "Juicy chicken chunks marinated in yogurt-spice blend, tandoor grilled" },
          { id: 406, name: "Mutton Seekh Kebab", price: 300, isVeg: false, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=300&fit=crop", description: "Succulent minced mutton kebabs with aromatic spices" },
        ]
      },
      {
        category: "Breads & Sides",
        items: [
          { id: 407, name: "Roomali Roti", price: 40, isVeg: true, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop", description: "Paper-thin soft bread, perfect with curries" },
          { id: 408, name: "Mirchi Ka Salan", price: 180, isVeg: true, image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=300&h=300&fit=crop", description: "Hyderabadi chilli curry in peanut-sesame gravy" },
          { id: 409, name: "Raita", price: 60, isVeg: true, image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=300&h=300&fit=crop", description: "Cool yogurt with cucumber, onions, and mild spices" },
        ]
      },
    ],
  },
  {
    id: 5,
    name: "Pizza Republic",
    cuisine: ["Pizza", "Italian"],
    rating: 4.3,
    deliveryTime: "25-30 mins",
    deliveryMinutes: 28,
    priceForTwo: 600,
    isPureVeg: false,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=1200&h=400&fit=crop",
    address: "22, Koregaon Park, Lane 7",
    menu: [
      {
        category: "Pizzas",
        items: [
          { id: 501, name: "Margherita", price: 249, isVeg: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=300&fit=crop", description: "Classic pizza with fresh mozzarella, tomato sauce, and basil" },
          { id: 502, name: "Pepperoni Feast", price: 399, isVeg: false, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=300&fit=crop", description: "Loaded with spicy pepperoni slices and extra cheese" },
          { id: 503, name: "Farmhouse", price: 349, isVeg: true, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop", description: "Bell peppers, mushrooms, onions, and tomatoes on a cheesy base" },
          { id: 504, name: "BBQ Chicken", price: 429, isVeg: false, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop", description: "Smoky BBQ sauce base with grilled chicken and red onions" },
          { id: 505, name: "Paneer Overload", price: 379, isVeg: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=300&fit=crop", description: "Loaded with paneer cubes, capsicum, and onion in tandoori sauce" },
        ]
      },
      {
        category: "Pasta",
        items: [
          { id: 506, name: "Penne Arrabbiata", price: 249, isVeg: true, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=300&fit=crop", description: "Penne pasta in spicy tomato sauce with garlic and herbs" },
          { id: 507, name: "Chicken Alfredo", price: 319, isVeg: false, image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=300&h=300&fit=crop", description: "Creamy white sauce pasta with grilled chicken strips" },
        ]
      },
      {
        category: "Sides & Beverages",
        items: [
          { id: 508, name: "Garlic Bread (4 pcs)", price: 149, isVeg: true, image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=300&h=300&fit=crop", description: "Toasted bread with garlic butter and herbs" },
          { id: 509, name: "Cheesy Dip Sticks", price: 179, isVeg: true, image: "https://images.unsplash.com/photo-1548507200-b4b8e46e92d1?w=300&h=300&fit=crop", description: "Mozzarella-stuffed breadsticks with marinara dip" },
          { id: 510, name: "Cold Coffee", price: 129, isVeg: true, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop", description: "Chilled coffee blended with ice cream and chocolate" },
        ]
      },
    ],
  },
  {
    id: 6,
    name: "Burger Barn",
    cuisine: ["Burgers", "Street Food"],
    rating: 4.0,
    deliveryTime: "20-25 mins",
    deliveryMinutes: 22,
    priceForTwo: 350,
    isPureVeg: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&h=400&fit=crop",
    address: "9, FC Road, Near Deccan",
    menu: [
      {
        category: "Burgers",
        items: [
          { id: 601, name: "Classic Smash Burger", price: 189, isVeg: false, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop", description: "Juicy smashed beef patty with cheddar, lettuce, and special sauce" },
          { id: 602, name: "Crispy Chicken Burger", price: 209, isVeg: false, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300&h=300&fit=crop", description: "Crunchy fried chicken fillet with coleslaw and mayo" },
          { id: 603, name: "Paneer Tikka Burger", price: 179, isVeg: true, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=300&fit=crop", description: "Grilled paneer tikka patty with mint mayo and onion rings" },
          { id: 604, name: "Double Trouble", price: 289, isVeg: false, image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=300&fit=crop", description: "Double patty, double cheese, jalapeños, and smoky BBQ" },
        ]
      },
      {
        category: "Fries & Sides",
        items: [
          { id: 605, name: "Peri Peri Fries", price: 129, isVeg: true, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=300&fit=crop", description: "Crispy fries dusted with spicy peri-peri seasoning" },
          { id: 606, name: "Loaded Cheese Fries", price: 169, isVeg: true, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=300&fit=crop", description: "Fries smothered in melted cheese sauce and jalapeños" },
          { id: 607, name: "Chicken Wings (6 pcs)", price: 249, isVeg: false, image: "https://images.unsplash.com/photo-1608039829572-9b0062eae8be?w=300&h=300&fit=crop", description: "Smoky BBQ glazed chicken wings, finger-licking good" },
        ]
      },
      {
        category: "Shakes",
        items: [
          { id: 608, name: "Chocolate Shake", price: 149, isVeg: true, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=300&fit=crop", description: "Thick chocolate milkshake topped with whipped cream" },
          { id: 609, name: "Oreo Shake", price: 169, isVeg: true, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=300&fit=crop", description: "Creamy milkshake blended with crushed Oreo cookies" },
        ]
      },
    ],
  },
  {
    id: 7,
    name: "Sweet Tooth Bakery",
    cuisine: ["Desserts", "Ice Cream"],
    rating: 4.6,
    deliveryTime: "20-25 mins",
    deliveryMinutes: 23,
    priceForTwo: 400,
    isPureVeg: true,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1200&h=400&fit=crop",
    address: "33, Bandra West, Hill Road",
    menu: [
      {
        category: "Cakes",
        items: [
          { id: 701, name: "Chocolate Truffle Cake (500g)", price: 549, isVeg: true, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop", description: "Rich, decadent chocolate truffle layered cake" },
          { id: 702, name: "Red Velvet Cake (500g)", price: 599, isVeg: true, image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=300&h=300&fit=crop", description: "Classic red velvet with cream cheese frosting" },
          { id: 703, name: "Blueberry Cheesecake (Slice)", price: 249, isVeg: true, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&h=300&fit=crop", description: "Creamy New York-style cheesecake with blueberry compote" },
        ]
      },
      {
        category: "Ice Cream",
        items: [
          { id: 704, name: "Belgian Chocolate Scoop", price: 129, isVeg: true, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop", description: "Premium Belgian chocolate ice cream, single scoop" },
          { id: 705, name: "Mango Sorbet", price: 119, isVeg: true, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop", description: "Refreshing mango sorbet made with Alphonso mangoes" },
          { id: 706, name: "Brownie Sundae", price: 229, isVeg: true, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop", description: "Warm brownie topped with vanilla ice cream, fudge, and nuts" },
        ]
      },
      {
        category: "Pastries & More",
        items: [
          { id: 707, name: "Croissant", price: 89, isVeg: true, image: "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=300&h=300&fit=crop", description: "Buttery, flaky French croissant baked fresh" },
          { id: 708, name: "Cinnamon Roll", price: 119, isVeg: true, image: "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=300&h=300&fit=crop", description: "Warm cinnamon swirl roll with cream cheese glaze" },
          { id: 709, name: "Macarons (Box of 6)", price: 349, isVeg: true, image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=300&h=300&fit=crop", description: "Assorted French macarons — pistachio, rose, chocolate, vanilla, caramel, raspberry" },
        ]
      },
    ],
  },
  {
    id: 8,
    name: "Kolkata Rolls & More",
    cuisine: ["Rolls", "Street Food", "North Indian"],
    rating: 3.9,
    deliveryTime: "25-30 mins",
    deliveryMinutes: 28,
    priceForTwo: 250,
    isPureVeg: false,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=400&fit=crop",
    address: "101, Park Street Extension",
    menu: [
      {
        category: "Rolls",
        items: [
          { id: 801, name: "Chicken Kathi Roll", price: 150, isVeg: false, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=300&fit=crop", description: "Juicy chicken tikka wrapped in flaky paratha with onions and chutney" },
          { id: 802, name: "Egg Roll", price: 100, isVeg: false, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=300&fit=crop", description: "Classic Kolkata egg roll with onions, lime, and green chutney" },
          { id: 803, name: "Paneer Tikka Roll", price: 140, isVeg: true, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=300&fit=crop", description: "Grilled paneer tikka with peppers in a warm paratha wrap" },
          { id: 804, name: "Double Chicken Roll", price: 200, isVeg: false, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=300&fit=crop", description: "Extra loaded chicken roll with double filling" },
          { id: 805, name: "Mutton Seekh Roll", price: 180, isVeg: false, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=300&fit=crop", description: "Spiced mutton seekh kebab in a paratha roll" },
        ]
      },
      {
        category: "Street Snacks",
        items: [
          { id: 806, name: "Pani Puri (6 pcs)", price: 60, isVeg: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=300&fit=crop", description: "Crispy puris filled with spiced water, chickpeas, and chutneys" },
          { id: 807, name: "Aloo Tikki Chaat", price: 90, isVeg: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=300&fit=crop", description: "Crispy potato patties topped with yogurt, chutneys, and sev" },
          { id: 808, name: "Samosa (2 pcs)", price: 50, isVeg: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=300&fit=crop", description: "Golden fried pastry stuffed with spiced potatoes and peas" },
        ]
      },
      {
        category: "Beverages",
        items: [
          { id: 809, name: "Masala Chai", price: 30, isVeg: true, image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&h=300&fit=crop", description: "Authentic Indian spiced tea brewed with ginger and cardamom" },
          { id: 810, name: "Sweet Lassi", price: 70, isVeg: true, image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=300&h=300&fit=crop", description: "Chilled sweet yogurt drink, creamy and refreshing" },
        ]
      },
    ],
  },
];
