import mongoose from 'mongoose';


const purchaseHistorySchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
    name: { type: String, required: true},
    unit_price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true, min: 0 }
}, {_id: false });

const orderSchema = new mongoose.Schema({
    items: { type: [purchaseHistorySchema], required: true },
    total: { type: Number, required: true, min: 0 },

    buyer_name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    payment_method: { type: String, required: true, trim: true },
    
    // enum lista cerrada de estados permitidos 
    status: { type: String, enum: ['new', 'preparing', 'on_the_way', 'delivered'], default: 'new' }
}, {
    timestamps: true,
    versionKey: false
});

const Order = mongoose.model('Order', orderSchema);
export default Order;