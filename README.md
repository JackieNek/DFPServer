# DFPServer
Cung cấp các api cho việc xử lý file phân tán

## Các công nghệ sử dụng
- NodeJS
- Monogodb

## Set up server local trên máy của bạn
### Yêu câu máy có cài đặt NodeJS version 8 trở lên, cài đặt thêm nodemon dành cho phát triển api
### 1. Tải mã nguồn
  `git clone  https://github.com/JackieNek/DFPServer.git`
### 2. Truy cập thư mục mã nguồn
  `cd DFPServer`
### 3. Cài đặt các thư viện
  `npm install`
### 4. Run server
  Dành cho sử dụng api `node index.js
  Dành cho phát triển api `npm start`
  restart server bằng lệnh `rs`
### 5. Kiểm tra:
  truy cập `http://localhost:8000/api/test` bằng trình duyệt kết quả thu được chuỗi json `{"test":"ok"}`

## Dành cho dev
### 1. Làm việc với cơ sở dữ liệu
##### Đăng ký collection trong cơ sở dữ liệu
  Tạo một mô hình collection trong `lib/collection/`(tham khảo `lib/collection/test.js`) và đăng ký nó trong file `lib/collection/index.js`
##### CRUD với collection
  Tạo một file trong `lib/` tại đây có thể xử lý các thao tác crud với collection (tham khảo `lib/test.js`) đăng ký trong file `lib/index.js`
### 2. Phát triển api
##### Đăng ký api
  Tham khảo file `api/index.js`
##### Cấu trúc api
  Tham khảo folder `api/test`
##### Sử đụng CRUD với api trong controller hoặc middleware
  `lib.collectionName.function()`