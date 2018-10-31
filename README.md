# DFPServer
Cung cấp các api cho việc xử lý file phân tán

## Các công nghệ sử dụng
###### - NodeJS
###### - Monogodb

## Set up server local trên máy của bạn
### Yêu câu máy có cài đặt NodeJS version 8 trở lên, cài đặt thêm nodemon dành cho phát triển api
### 1. Tải mã nguồn
###### `git clone  https://github.com/JackieNek/DFPServer.git`
### 2. Truy cập thư mục mã nguồn
######  `cd DFPServer`
### 3. Cài đặt các thư viện
######  `npm install`
### 4. Run server
######  Dành cho sử dụng api `node index.js
######  Dành cho phát triển api `npm start`
######  restart server bằng lệnh `rs`
### 5. Kiểm tra:
######  truy cập `http://localhost:8000/api/test` bằng trình duyệt kết quả thu được chuỗi json `{"test":"ok"}`

## Dành cho dev
### 1. Làm việc với cơ sở dữ liệu
##### Đăng ký collection trong cơ sở dữ liệu
######  Tạo một mô hình collection trong `lib/collection/`(tham khảo `lib/collection/test.js`) và đăng ký nó trong file `lib/collection/index.js`
##### CRUD với collection
######  Tạo một file trong `lib/` tại đây có thể xử lý các thao tác crud với collection (tham khảo `lib/test.js`) đăng ký trong file `lib/index.js`
### 2. Phát triển api
##### Đăng ký api
######  Tham khảo file `api/index.js`
##### Cấu trúc api
######  Tham khảo folder `api/test`
##### Sử đụng CRUD với api trong controller hoặc middleware
######  `lib.collectionName.function()`

## Document api link
######  https://docs.google.com/spreadsheets/d/1pmnSbpOP7B07nYl6Y43x564lbmREUWfmDVxX2A1_AT4/edit?fbclid=IwAR3EA9FIbZBxH40JKVo8507XFPiMfGNwd78hzkZTKB2tvFpuVKOMVktcjPk#gid=1736681266

### RECORD
#### Cấu trúc
`{`
`  fileId: String,`
`  speaker: String,`
`  time: Number,`
`  content: String`
`}`
##### 1. GET `/api/record?query`
##### Chức năng: liệt kê các bản ghi
##### Các tham số của query 
###### - `recordID`: id của bản ghi - kiểu dữ kiệu: ObjectID
###### - `fileId`: id của file      - kiểu dữ liệu: ObjectID
###### - `speaker`: người nói       - Kiểu dữ liệu: String
###### Đầu ra: Danh sách các bản ghi

##### 2. POST /api/record
###### Chức năng: tạo mới một bản ghi
###### Đầu vào: `record` chứa trong `body`
###### Đầu ra: `record` chứa thêm trường `_id`

##### 3. PUT `/api/record/:recordID`
###### Chức năng: Sửa một bản ghi có sẵn
###### Tham số `recordID` là id của bản ghi - kiểu dữ liệu ObjecID
###### Đầu vào: `options` chứa các trường thay đổi ghi vào trong `body`
###### Đầu ra: Bản ghi đã được sửa

##### 3. DELETE `/api/record/:recordID`
###### Chức năng: Xóa một bản ghi có sẵn
###### Tham số `recordID` là id của bản ghi - kiểu dữ liệu ObjecID
###### Đầu ra: Bản ghi đã được sửa

### FILE
#### Cấu trúc
`{`
`  name: String,`
`  creator: String,`
`  owners: Array`
`}`
##### 1. GET `/api/file?query`
##### Chức năng: liệt kê các file
##### Các tham số của query 
###### - `creator`: id của bản ghi - kiểu dữ kiệu: ObjectID
###### - `fileId`: id của file     - kiểu dữ liệu: ObjectID
###### - `owner`: người nói        - Kiểu dữ liệu: ObjectID
###### Đầu ra: Danh sách các file

##### 2. POST /api/file phần 2 này đang phát triển
###### Chức năng: tạo mới một file từ hai file có cấu trúc
###### Đầu vào: 
###### Đầu ra: 

##### 3. PUT `/api/file/:fileID`
###### Chức năng: Sửa một bản ghi có sẵn
###### Tham số `fileID` là id của bản ghi - kiểu dữ liệu ObjecID
###### Đầu vào: `options` chứa các trường thay đổi ghi vào trong `body`
###### Đầu ra: File đã được sửa thông tin