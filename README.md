# DFPServer
Cung cấp các api cho việc xử lý file phân tán

## Các công nghệ sử dụng
- NodeJS
- Monogodb

## Set up server local trên máy của bạn
### Yêu câu máy có cài đặt NodeJS version 8 trở lên
### 1. Tải mã nguồn
  `git clone  https://github.com/JackieNek/DFPServer.git`
### 2. Truy cập thư mục mã nguồn
  `cd DFPServer`
### 3. Cài đặt các thư viện
  `npm install`
### 4. Run server
  `npm start`
  restart server bằng lệnh `rs`
### 5. Kiểm tra:
  truy cập `http://localhost:8000/api/test` bằng trình duyệt kết quả thu được chuỗi json `{"test":"ok"}`