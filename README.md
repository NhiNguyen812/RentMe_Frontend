# RentMe – Frontend

Ứng dụng di động "RentMe – Dùng smart, sống smart" được code lại từ bản thiết kế Figma (Sharing_app), bằng React + Vite + TypeScript.

## Chạy dự án

```bash
npm install
npm run dev      # mở http://localhost:5173
npm run build    # bản build nằm trong thư mục dist/
```

Trên máy tính, app hiển thị trong khung điện thoại 440×956. Trên điện thoại, app hiển thị toàn màn hình.

## Đổi ngôn ngữ (Tiếng Việt / English)

Vào **Người dùng → Giao diện → Ngôn ngữ**, chọn **Tiếng Anh**, rồi bấm **Áp dụng**. Ở cùng màn hình đó có thể đổi giao diện Sáng/Tối. Lựa chọn được lưu trong localStorage.

## Cấu trúc

- `src/i18n.ts`: toàn bộ chuỗi tiếng Việt (`vi`) và tiếng Anh (`en`).
- `src/data.ts`: dữ liệu mẫu (sản phẩm, liên hệ, tin nhắn), có song ngữ.
- `src/components.tsx`: header, thanh điều hướng dưới, nút chatbot, khung màn hình con.
- `src/screens/`: các màn hình (Trang chủ, Tin tức, Cho mượn, Mượn đồ, Người dùng, Chi tiết, Thanh toán, Trạng thái đơn, Đánh giá, Hoàn trả, Tin nhắn, Chat, Thông báo, Chatbot, Đăng đồ, Giao diện, Thông tin cá nhân).
- `src/assets/img/`: hình ảnh lấy từ Figma (định dạng webp).
