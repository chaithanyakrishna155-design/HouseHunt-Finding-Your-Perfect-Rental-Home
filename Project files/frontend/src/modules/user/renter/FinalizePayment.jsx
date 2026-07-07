import React, { useState } from "react";
import { Button, message, Select, Input, Form } from "antd";
import axios from "axios";

const { Option } = Select;

const FinalizePayment = ({ booking, onClose }) => {
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("gpay");
  const [loading, setLoading] = useState(false);

  const [paid, setPaid] = useState(
    booking?.paymentStatus === "paid"
  );

  const {
    _id: bookingId,
    renterId,
    ownerId,
    bookingStatus,
    amount,
    paymentStatus,
  } = booking || {};

  const handlePayment = async (values) => {
    // Allow payment only after owner books/approves
    if (bookingStatus !== "booked") {
      return message.error(
        "Owner has not approved your booking yet."
      );
    }

    if (paymentStatus === "paid" || paid) {
      return message.info("Payment already completed.");
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8001/api/payment/pay-to-owner",
        {
          bookingId,
          renterId,
          ownerId,
          amount: values.amount,
          paymentMethod,
          details: values.upiId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        message.success("Payment Successful");

        setPaid(true);

        form.resetFields();

        if (onClose) {
          setTimeout(() => {
            onClose();
          }, 800);
        }
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      message.error(
        err.response?.data?.message || "Payment Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <h4>Finalize Payment</h4>

      <p>
        Booking Status :
        <b style={{ marginLeft: "8px" }}>
          {bookingStatus || "Pending"}
        </b>
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={handlePayment}
      >
        <Form.Item label="Payment Method">
          <Select
            value={paymentMethod}
            onChange={setPaymentMethod}
            disabled={paid}
          >
            <Option value="gpay">GPay</Option>
            <Option value="phonepe">PhonePe</Option>
            <Option value="paytm">Paytm</Option>
            <Option value="card">Card</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="upiId"
          label="UPI ID / Mobile Number"
          rules={[
            {
              required: true,
              message: "Enter UPI ID or Mobile Number",
            },
          ]}
        >
          <Input
            disabled={paid}
            placeholder="example@upi"
          />
        </Form.Item>

        <Form.Item
          name="amount"
          label="Amount"
          initialValue={amount}
          rules={[
            {
              required: true,
              message: "Enter Amount",
            },
          ]}
        >
          <Input
            type="number"
            disabled={paid}
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            loading={loading}
            disabled={paid}
            style={{
              width: "100%",
              background: paid ? "green" : "#1677ff",
              color: "white",
              border: "none",
            }}
          >
            {paid ? "Paid ✓" : "Pay"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FinalizePayment;