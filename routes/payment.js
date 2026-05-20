import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

/**
 * 🧾 CREATE ORDER (ONLY SOURCE OF TRUTH)
 */
router.post("/create", async (req, res) => {
  try {
    const {
      product,
      size,
      customer,
      totalUsd,
      paymentMethod,
    } = req.body;

    const order = await Order.create({
      product,
      size,
      customer,
      totalUsd,
      paymentMethod: paymentMethod || "USDC",
      paymentStatus: "pending",
    });

    res.json({
      success: true,
      orderId: order._id,

      walletAddress: {
        BTC: "YOUR_BTC_WALLET",
        ETH: "YOUR_ETH_WALLET",
        USDT: "YOUR_USDT_WALLET",
        USDC: "YOUR_USDC_WALLET",
      },
    });

  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * ✅ CONFIRM PAYMENT (manual / future automation)
 */
router.post("/confirm", async (req, res) => {
  try {
    const { orderId, txHash, proofImage } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.paymentStatus = "paid";
    if (txHash) order.txHash = txHash;
    if (proofImage) order.proofImage = proofImage;

    await order.save();

    res.json({
      success: true,
      message: "Payment confirmed",
    });

  } catch (err) {
    console.error("CONFIRM ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * 📦 GET ORDER (for admin / tracking)
 */
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
