###  API 명세서
- GET: 리소스 조회 
- POST: 요청 데이터 처리, 주로 등록에 사용
- PUT: 리소스 대체, 해당리소스가 없을 때
- PATCH: 리소스 부분 변경
- DELETE: 리소스 삭제

### API 엔드포인트 요약

| **기능**                  | **엔드포인트**                                     | **메서드** | **설명**                                     |
|---------------------------|----------------------------------------------------|------------|----------------------------------------------|
| ✅ 1. 유저 대기열 신청          | `/queue`                                 | `POST`     | 서비스 이용권을 발급하고 대기열에 추가합니다. |
| ✅ 2. 유저 대기열 조회          | `/queue?{userId}`                                | `GET`      | 사용자의 현재 대기열 상태를 조회합니다.      |
| ✅ 3. 예약 가능 날짜 조회        | `/concerts/{concertId}/available-dates`        | `GET`      | 특정 콘서트의 예약 가능한 날짜를 조회합니다. |
| ✅ 4. 예약 가능 날짜의 좌석 조회  | `/concerts/{concertId}/sessions/{sessionId}/available-seats`     | `GET`      | 특정 날짜의 예약 가능한 좌석을 조회합니다.    |
| ✅ 5. 콘서트 좌석 예약          | `/concerts/{concertId}/sessions/{sessionId}/reservations` | `POST` | 특정 좌석을 예약합니다.                      |
| ✅ 6. 콘서트 좌석 결제          | `/users/payments`                            | `POST`     | 예약된 좌석에 대한 결제를 처리합니다.         |
| ✅ 7. 잔액 조회                  | `/user/{userId}/points`                                   | `GET`      | 사용자의 현재 잔액을 조회합니다.              |
| ✅ 8. 잔액 충전                  | `/user/points`                            | `POST`     | 사용자의 잔액에 자금을 추가합니다.            |
| ✅ 9. 회원가입                  | `/signup`                                | `POST`     | 새로운 사용자를 등록합니다.                  |


---

### 1. **유저 대기열 신청 (Apply for User Queue)**

- **Endpoint**
  - **URL:** `/queue`
  - **Method:** `POST`
  - **설명:** 토큰을 발급하고 사용자를 대기열에 추가합니다.

- **Request**
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "userId": "12345"
    }
    ```

- **Response**
  - **200 OK**
    ```json
    {
      "waitingToken": "abcdef123456",
      "queueInfo": {
        "status": "대기",
        "position": 10,
        "estimatedWaitTime": 30 // 분 단위
      }
    }
    ```

- **Error**
  - **400 Bad Request** (예: 유효하지 않은 사용자)
    ```json
    {
      "error": "유효하지 않은 회원입니다."
    }
    ```

- **Authorization**
  - **필요 없음:** 회원가입은 인증 없이 접근 가능합니다.

---

#### 2. **유저 대기열 확인 (Check Queue Status)**

- **Endpoint**
  - **URL:** `/queue?{userId}`
  - **Method:** `GET`
  - **설명:** 사용자의 현재 대기열 상태를 조회합니다.

- **Request**
  - **Headers:**
    - `Content-Type: application/json`
    - `WAITING_TOKEN: UUID (대기열 확인을 위한 토큰)`
  - **Query Parameters:**
    - `userId`

- **Response**
  - **200 OK** (상태가 '대기'일 때)
    ```json
    {
      "status": "대기", // 가능한 값: '대기', '활성화',
      "position": 5,
      "estimatedWaitTime": 15 // 분 단위
    }
    ```
  - **200 OK** (상태가 '활성화'일 때)
    ```json
    {
      "status": "활성화",
      "message": "서비스 이용이 가능합니다."
    }
    ```
  - **400 Bad Request** (예: 서비스 이용권을 찾을 수 없음)
    ```json
    {
      "error": "서비스 이용권을 찾을 수 없습니다."
    }
    ```

- **Error**
  - **400 Bad Request**
    - **사유:** 유효하지 않은 서비스 토큰, 필수 파라미터 누락 등
    - **메시지 예시:**
      ```json
      {
        "error": "서비스 이용권을 찾을 수 없습니다."
      }
      ```
  - **401 Unauthorized**
    - **사유:** 유저 아이디 인증 실패
    - **메시지 예시:**
      ```json
      {
        "error": "인증에 실패했습니다."
      }
      ```

- **Authorization**
  - **필수:** 유효한 서비스 이용권 토큰 (`WAITING_TOKEN`) 필요

---

#### 3. **예약 가능 날짜 조회 (Get Available Reservation Dates)**

- **Endpoint**
  - **URL:** `/concerts/{concertId}/available-dates`
  - **Method:** `GET`
  - **설명:** 특정 콘서트의 예약 가능한 날짜 목록을 조회합니다.

- **Request**
  - **Path Parameters:**
    - `concertId` (예: `123`)
  - **Headers:**
    - `WAITING_TOKEN: UUID (대기열 확인을 위한 토큰)`

- **Response**
  - **200 OK**
    ```json
    {
      "concertId": "123",
      "availableDates": ["2024-05-01", "2024-05-02", "2024-05-03"]
    }
    ```
  - **403 Forbidden** (예: 서비스 이용권이 활성화되지 않은 경우)
    ```json
    {
      "error": "서비스 이용권 상태가 활성화되어 있지 않습니다."
    }
    ```
  - **404 Not Found** (예: 콘서트를 찾을 수 없는 경우)
    ```json
    {
      "error": "해당 콘서트를 찾을 수 없습니다."
    }
    ```

- **Error**
  - **400 Bad Request**
    - **사유:** 유효하지 않은 `concertId`
    - **메시지 예시:**
      ```json
      {
        "error": "유효하지 않은 콘서트 ID입니다."
      }
      ```
  - **403 Forbidden**
    - **사유:** 서비스 이용권이 활성화되지 않음
    - **메시지 예시:**
      ```json
      {
        "error": "서비스 이용권 상태가 활성화되어 있지 않습니다."
      }
      ```
  - **404 Not Found**
    - **사유:** 존재하지 않는 콘서트
    - **메시지 예시:**
      ```json
      {
        "error": "해당 콘서트를 찾을 수 없습니다."
      }
      ```

- **Authorization**
  - **필수:** 유효한 서비스 이용권 토큰 (`WAITING_TOKEN`) 필요

---

#### 4. **예약 가능 날짜의 좌석 조회 (Get Available Seats for a Specific Date)**

- **Endpoint**
  - **URL:** `concerts/{concertId}/sessions/{sessionId}/available-seats`
  - **Method:** `GET`
  - **설명:** 특정 콘서트의 특정 날짜에 예약 가능한 좌석을 조회합니다.

- **Request**
  - **Path Parameters:**
    - `concertId` (예: `123`)
    - `sessionId` (예: `123`)   
  - **Headers:**
    - `WAITING_TOKEN: UUID (대기열 확인을 위한 토큰)`

- **Response**
  - **200 OK**
    ```json
    {
      "concertId": "123",
      "date": "2024-05-01",
      "availableSeats": [1, 2, 3, /* ... */, 50]
    }
    ```
  - **404 Not Found** (예: 콘서트 또는 날짜를 찾을 수 없는 경우)
    ```json
    {
      "error": "해당 콘서트 또는 날짜를 찾을 수 없습니다."
    }
    ```
  - **403 Forbidden** (예: 서비스 이용권이 활성화되지 않은 경우)
    ```json
    {
      "error": "서비스 이용권 상태가 활성화되어 있지 않습니다."
    }
    ```

- **Error**
  - **400 Bad Request**
    - **사유:** 유효하지 않은 `concertId` 또는 `sessionId` 형식
    - **메시지 예시:**
      ```json
      {
        "error": "유효하지 않은 날짜 형식입니다."
      }
      ```
  - **403 Forbidden**
    - **사유:** 서비스 이용권이 활성화되지 않음
    - **메시지 예시:**
      ```json
      {
        "error": "서비스 이용권 상태가 활성화되어 있지 않습니다."
      }
      ```
  - **404 Not Found**
    - **사유:** 존재하지 않는 콘서트 또는 날짜
    - **메시지 예시:**
      ```json
      {
        "error": "해당 콘서트 또는 날짜를 찾을 수 없습니다."
      }
      ```

- **Authorization**
  - **필수:** 유효한 서비스 이용권 토큰 (`WAITING_TOKEN`) 필요

---

#### 5. **콘서트 좌석 예약 (Reserve a Seat)**

- **Endpoint**
  - **URL:** `/concerts/{concertId}/sessions/{sessionId}/reservations`
  - **Method:** `POST`
  - **설명:** 사용자가 특정 좌석을 예약합니다.

- **Request**
  - **Path Parameters:**
    - `concertId`
    - `sessionId`
  - **Headers:**
    - `WAITING_TOKEN: UUID (대기열 확인을 위한 토큰)`
  - **Body:**
    ```json
    {
      "seatNumber": 25
    }
    ```

- **Response**
  - **200 OK**
    ```json
    {
      "reservationId": "resv12345",
      "seatNumber": 25,
      "status": "예약 성공"
    }
    ```

- **Error**
  - **400 Bad Request**
    - **사유:** 유효하지 않은 `seatNumber`
    - **메시지 예시:**
      ```json
      {
        "error": "유효하지 않은 좌석 번호입니다."
      }
      ```
  - **409 Conflict**
    - **사유:** 선택한 좌석이 이미 예약됨
    - **메시지 예시:**
      ```json
      {
        "error": "선택한 좌석은 이미 예약 불가능 상태입니다."
      }
      ```
  - **403 Forbidden**
    - **사유:** 서비스 이용권이 활성화되지 않음
    - **메시지 예시:**
      ```json
      {
        "error": "서비스 이용권 상태가 활성화되어 있지 않습니다."
      }
      ```

- **Authorization**
  - **필수:** 유효한 서비스 이용권 토큰 (`WAITING_TOKEN`) 필요

---

#### 6. **콘서트 좌석 결제 (Pay for Reserved Seat)**

- **Endpoint**
  - **URL:** `/users/payments`
  - **Method:** `POST`
  - **설명:** 예약된 좌석에 대한 결제를 처리합니다.

- **Request**
  - **Headers:**
    - `WAITING_TOKEN: UUID (대기열 확인을 위한 토큰)`
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "reservationId": "resv12345"
    }
    ```

- **Response**
  - **200 OK** (결제 성공)
    ```json
    {
      "status": "결제 완료",
      "balance": 4500 // 차감 후 잔액
    }
    ```

- **Error**
  - **400 Bad Request**
    - **사유:** 유효하지 않은 `reservationId`
    - **메시지 예시:**
      ```json
      {
        "error": "유효하지 않은 예약 ID입니다."
      }
      ```
  - **402 Payment Required**
    - **사유:** 사용자 포인트 부족
    - **메시지 예시:**
      ```json
      {
        "error": "잔액이 부족하여 결제에 실패했습니다."
      }
      ```
  - **403 Forbidden**
    - **사유:** 서비스 이용권이 활성화되지 않음
    - **메시지 예시:**
      ```json
      {
        "error": "서비스 이용권 상태가 활성화되어 있지 않습니다."
      }
      ```

- **Authorization**
  - **필수:** 유효한 서비스 이용권 토큰 (`WAITING_TOKEN`) 필요

---


#### 7. **잔액 조회 (Check Balance)**

- **Endpoint**
  - **URL:** `/user/{userId}/points`
  - **Method:** `GET`
  - **설명:** 사용자의 현재 잔액을 조회합니다.

- **Request**
  - **Headers:**

- **Response**
  - **200 OK**
    ```json
    {
      "point": 5000
    }
    ```

- **Error**
  - **400 Bad Request**
    - **사유:** 유효하지 않은 유저 아이디
    - **메시지 예시:**
      ```json
      {
        "error": "사용자가 유효하지 않습니다."
      }
      ```
- **Authorization**

---



#### 8. **잔액 충전 (Recharge Balance)**

- **Endpoint**
  - **URL:** `/user/{userId}/points`
  - **Method:** `POST`
  - **설명:** 사용자의 잔액에 자금을 추가합니다.

- **Request**
  - **Headers:**

  - **Body:**
    ```json
    {
      "amount": 1000
    }
    ```

- **Response**
  - **200 OK** (충전 성공)
    ```json
    {
      "point": 5000, // 업데이트된 잔액
      "message": "잔액 충전이 완료되었습니다."
    }
    ```

- **Error**
  - **400 Bad Request**
    - **사유:** 음수 금액, 너무 큰 금액 등
    - **메시지 예시:**
      ```json
      {
        "error": "유효하지 않은 충전 금액입니다."
      }
      ```
  - **403 Forbidden**
    - **사유:** 서비스 이용권이 활성화되지 않음
    - **메시지 예시:**
      ```json
      {
        "error": "서비스 이용권 상태가 활성화되어 있지 않습니다."
      }
      ```

- **Authorization**

---



#### 9. **회원가입 (User Registration)**

- **Endpoint**
  - **URL:** `/signup`
  - **Method:** `POST`
  - **설명:** 제공된 아이디로 새로운 사용자를 등록합니다.

- **Request**
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "id": "123123"
    }
    ```

- **Response**
  - **201 Created**
    ```json
    {
      "id": "123123",
      "message": "회원가입이 완료되었습니다."
    }
    ```
  - **400 Bad Request** (예: 이미 등록된 아이디)
    ```json
    {
      "error": "이미 등록된 아이디입니다."
    }
    ```

- **Error**
  - **400 Bad Request**
    - **사유:** 필수 필드 누락, 형식 오류 등
    - **메시지 예시:**
      ```json
      {
        "error": "아이디 형식이 올바르지 않습니다."
      }
      ```

- **Authorization**
  - **필요 없음:** 회원가입은 인증 없이 접근 가능합니다.

---








