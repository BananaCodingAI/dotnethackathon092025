# สเป็กโครงการ: พอร์ทัลช็อปสินค้าองค์กร

## 1. ภาพรวม
- พนักงานสามารถเลือกดูและขอรับสินค้าที่มีตราองค์กรผ่านประสบการณ์เว็บที่รองรับทุกอุปกรณ์
- ส่วนหน้า Angular ติดต่อ .NET Core API และจัดเก็บข้อมูลในฐานข้อมูล NoSQL (เช่น Azure Cosmos DB API for MongoDB)
- การจัดส่งสินค้าทำผ่านใบสั่งซื้อ (Purchase Order) กับผู้ขายภายนอก จึงไม่มีการเก็บสต็อกภายในระบบ

## 2. เป้าหมายเชิงธุรกิจ
- ใช้สกุลเงินเสมือน BBcoin ขององค์กรเป็นสกุลหลักในการทำธุรกรรมทั้งหมด โดยผู้ดูแลสามารถกำหนดกติกาและยอดคงเหลือได้เอง
- มีกระบวนการจัดซื้อที่ตรวจสอบย้อนหลังได้ พร้อมเอกสารใบสั่งซื้อสำหรับส่งต่อให้ผู้ขายภายนอก
- ให้ประสบการณ์เลือกซื้อแบบบริการตนเอง ในขณะที่ภาระงานดูแลระบบยังคงเบา

## 3. ขอบเขต
- อยู่ในขอบเขต: การเรียกดูแคตตาล็อก, รถเข็น, ชำระด้วย BBcoin, สร้างและพิมพ์ใบสั่งซื้อ, ติดตามสถานะใบสั่งซื้อ, ตั้งค่าบัดเจ็ท BBcoin, จัดการข้อมูลสินค้า และข้อมูลผู้ขาย
- อยู่นอกขอบเขต: การจองสต็อก, การซิงก์สต็อกแบบเรียลไทม์, การเชื่อมต่อ SSO, เกตเวย์ชำระเงินภายนอก และพอร์ทัลสำหรับผู้ขาย

## 4. บุคคลตัวอย่าง (Persona)
| Persona | เป้าหมาย | ความกังวล |
| --- | --- | --- |
| พนักงานผู้สั่งซื้อ | ใช้ BBcoin ที่ได้รับเพื่อแลกสินค้าที่อนุมัติ | ต้องการเห็นยอด BBcoin และสถานะใบสั่งซื้อชัดเจน |
| HR / Office Admin | ตั้งงบ BBcoin และอนุมัติใบสั่งซื้อ | ต้องควบคุมได้โดยไม่ต้องมีทักษะเทคนิคสูง |
| เจ้าหน้าที่จัดซื้อ | ส่งใบสั่งซื้อให้ผู้ขายภายนอก | ต้องการเอกสารใบสั่งซื้อพร้อมพิมพ์และข้อมูลติดต่อผู้ขาย |

## 5. เส้นทางผู้ใช้งาน
1. พนักงานเข้าสู่ระบบด้วยบัญชีที่จัดการภายในพอร์ทัล (ชื่อผู้ใช้/รหัสผ่าน)
2. ผู้ใช้เปิดหน้าแคตตาล็อก ค้นหา หรือกรองสินค้า และดูรายละเอียด
3. เพิ่มสินค้าลงรถเข็น ระบบตรวจสอบเฉพาะยอด BBcoin ไม่ตรวจสต็อก
4. ขั้นตอนชำระเงินรวบรวมข้อมูลจัดส่งและแสดงยอด BBcoin ที่จะถูกตัด
5. เมื่อยืนยัน ระบบสร้างใบสั่งซื้อและตัด BBcoin ออกจากกระเป๋า
6. ระบบสร้างไฟล์ใบสั่งซื้อ (PDF) สำหรับส่งให้ผู้ขายภายนอก
7. ผู้ใช้และผู้ดูแลติดตามสถานะใบสั่งซื้อและประวัติการตัด BBcoin ในหน้าประวัติคำสั่งซื้อ

## 6. ความต้องการเชิงฟังก์ชัน
- **การยืนยันตัวตน**: จัดเก็บบัญชีภายใน พร้อมนโยบายรหัสผ่าน และรองรับ MFA ตามต้องการ ไม่มีการเชื่อมต่อ SSO
- **การจัดการ BBcoin**: ผู้ดูแลกำหนดการแจกจ่าย วันหมดอายุ และปรับยอดด้วยตนเอง พร้อมบันทึกประวัติแบบตรวจสอบได้
- **แคตตาล็อกสินค้า**: แสดงรายการสินค้า หมวดหมู่ ป้ายกำกับ สื่อประกอบ และตัวเลือกสินค้า โดยไม่มีฟิลด์สต็อก
- **รถเข็น**: ตรวจสอบยอด BBcoin และความพร้อมของตัวเลือกสินค้า รองรับบันทึกโน้ตส่งให้ผู้ขาย
- **ชำระเงิน (Checkout)**: เก็บที่อยู่จัดส่ง/ข้อมูลติดต่อ แสดงยอด BBcoin รวม และรองรับขั้นตอนขออนุมัติถ้าจำเป็น
- **ใบสั่งซื้อ**: สร้างหมายเลข PO บันทึกข้อมูลผู้ขาย และสถานะวงจร (Draft, Sent, Fulfilled, Cancelled)
- **การพิมพ์ PO**: สร้างเทมเพลต PDF สำหรับพิมพ์พร้อมรายการสินค้าและยอด BBcoin
- **การติดตามคำสั่งซื้อ**: ผู้ใช้ตรวจสอบสถานะใบสั่งซื้อ ยอด BBcoin ที่ถูกตัด และพิมพ์ใบเสร็จ ผู้ดูแลปรับสถานะและอัปโหลดเอกสารจากผู้ขายได้
- **การแจ้งเตือน**: ส่งแจ้งเตือนทางอีเมลหรือ Teams เมื่อมียอด BBcoin เปลี่ยนแปลง การอนุมัติ หรือสถานะใบสั่งซื้อเปลี่ยน

## 7. ความต้องการที่ไม่ใช่ฟังก์ชัน
- สมรรถนะ: API สำหรับแคตตาล็อกและกระเป๋า BBcoin ตอบสนองต่ำกว่า 400 มิลลิวินาทีในเปอร์เซ็นไทล์ 95
- ความปลอดภัย: บังคับใช้ TLS, จัดเก็บรหัสผ่านแบบแฮช, ใช้ JWT, และกำหนดบทบาท (Shopper, Admin, Procurement)
- ความเป็นส่วนตัว: เก็บประวัติธุรกรรม BBcoin ไม่น้อยกว่า 7 ปี และเข้ารหัส PII เมื่อเก็บถาวร
- การปฏิบัติตามข้อกำหนด: ใบสั่งซื้อต้องมีข้อมูลนิติบุคคลและเลขภาษีขององค์กร

## 8. สถาปัตยกรรมระบบ
- ส่วนหน้า: Angular 16+ ใช้ Standalone Components, Angular Material และ NgRx สำหรับบริหารสถานะร่วมกัน
- ส่วนหลัง: .NET 8 Web API ตามแนวคิด Clean Architecture (API -> Application -> Domain -> Infrastructure)
- ฐานข้อมูล: ฐานข้อมูล NoSQL เช่น Azure Cosmos DB (API for MongoDB) หรือ MongoDB Atlas; ออกแบบโครงสร้างเอกสารตามคอลเลกชัน และจัดการเวอร์ชันสคีมาผ่าน Migration Script ระดับแอปพลิเคชัน
- การยืนยันตัวตน: ASP.NET Core Identity จัดเก็บบัญชีภายใน พร้อมรีเซ็ตรหัสผ่านผ่านอีเมล OTP
- การเชื่อมต่อ: SMTP/Graph API สำหรับการแจ้งเตือน, Teams Webhook เสริม, บริการสร้าง PDF (เช่น QuestPDF)

## 9. โมเดลโดเมน
| เอนทิตี | วัตถุประสงค์ | คีย์หลัก | หมายเหตุ |
| --- | --- | --- | --- |
| Users | บัญชีผู้ใช้พอร์ทัล | UserId (GUID), Email, PasswordHash, Role | บทบาท: Shopper, Admin, Procurement |
| BBcoinWallets | ติดตามยอดคงเหลือ BBcoin | WalletId, UserId FK, Balance, LastReconciledAt | 1 กระเป๋าต่อผู้ใช้ |
| BBcoinTransactions | บันทึกการเปลี่ยนยอด BBcoin | TxnId, WalletId FK, AmountDelta, Reason, ReferenceId, CreatedAt | ReferenceId เชื่อมไป PO หรือการปรับยอด |
| Merchandise | สินค้าในแคตตาล็อก | MerchandiseId, Name, Description, Category, BasePriceBBcoin, VendorId | ราคาอ้างอิงเป็น BBcoin |
| MerchandiseVariant | ข้อมูลตัวเลือกสินค้า | VariantId, MerchandiseId FK, VariantLabel, VendorSku, AdditionalNotes | ไม่มีฟิลด์สต็อก |
| Vendors | ผู้ขายภายนอก | VendorId, Name, ContactEmail, Phone, AddressJson | ใช้ระบุปลายทางใบสั่งซื้อ |
| Carts | รถเข็นที่ใช้งาน | CartId, UserId, LastUpdated | ผู้ใช้มีรถเข็นที่ใช้งานได้ 1 รายการ |
| CartItems | รายการในรถเข็น | CartItemId, CartId FK, VariantId FK, Quantity, Notes | โน้ตถูกพิมพ์ใน PO |
| PurchaseOrders | ข้อมูลใบสั่งซื้อ | PurchaseOrderId, PoNumber, UserId, VendorId, Status, TotalBBcoin, CreatedAt, SentAt, FulfilledAt | สถานะตามวงจร PO |
| PurchaseOrderItems | รายการสินค้าใน PO | PurchaseOrderItemId, PurchaseOrderId FK, VariantId FK, Quantity, UnitBBcoinCost | สร้างจากรถเข็น |
| Documents | เอกสารแนบ | DocumentId, PurchaseOrderId FK, FileName, FileUrl, UploadedBy, UploadedAt | เช่น ใบแจ้งหนี้ผู้ขาย |
| Notifications | บันทึกการแจ้งเตือน | NotificationId, Channel, PayloadJson, Status, CreatedAt | ช่องทาง: Email, Teams |

### แนวทางการจัดเก็บใน NoSQL
- จัดกลุ่มข้อมูลหลักตามคอลเลกชัน เช่น `users`, `wallets`, `merchandise`, `purchaseOrders`
- สำหรับคอลเลกชันที่ต้องการประสิทธิภาพสูง สามารถฝังเอกสารย่อย (embedded documents) เช่น `purchaseOrders.items`
- ใช้ Partition Key ตาม `CompanyId` หรือ `DepartmentId` (หากมี) เพื่อรองรับการสเกลของ Cosmos DB

### ความสัมพันธ์
- `Users` 1-* `BBcoinWallets` 1-* `BBcoinTransactions`
- `Users` 1-* `Carts` 1-* `CartItems`
- `PurchaseOrders` 1-* `PurchaseOrderItems`
- `PurchaseOrders` เชื่อมกับ `Users` (ผู้ร้องขอ) และ `Vendors` (ผู้รับ)

### ดัชนีและข้อจำกัด
- สร้างดัชนีเฉพาะ `MerchandiseVariant.VendorSku` ต่อผู้ขายผ่าน Unique Index ของคอลเลกชัน
- จำกัดให้มีรถเข็นที่ใช้งานอยู่เพียงหนึ่งต่อ `UserId`
- `BBcoinTransactions` ต้องมี `AmountDelta` ที่ไม่เป็นศูนย์
- `PurchaseOrders` ต้องมีหมายเลข PO เพิ่มตามลำดับ (จัดการเชิงแอปพลิเคชันและเก็บในเอกสารตั้งค่า)

## 10. การออกแบบ API
| Method | Endpoint | คำอธิบาย | Auth |
| --- | --- | --- | --- |
| POST | `/api/auth/login` | ออก JWT สำหรับผู้ใช้ที่เข้าสู่ระบบ | Public |
| POST | `/api/auth/logout` | ยกเลิก refresh token | Bearer |
| GET | `/api/me` | โปรไฟล์ผู้ใช้และยอด BBcoin | Bearer |
| GET | `/api/merchandise` | เรียกดูแคตตาล็อกพร้อมตัวกรอง | Public |
| GET | `/api/merchandise/{id}` | รายละเอียดสินค้า ตัวเลือก และข้อมูลผู้ขายสรุป | Public |
| POST | `/api/cart/items` | เพิ่มสินค้าเข้ารถเข็น | Bearer |
| PATCH | `/api/cart/items/{itemId}` | แก้จำนวนหรือบันทึกโน้ต | Bearer |
| DELETE | `/api/cart/items/{itemId}` | ลบสินค้าออกจากรถเข็น | Bearer |
| GET | `/api/cart` | ดึงภาพรวมรถเข็น | Bearer |
| POST | `/api/orders` | ชำระเพื่อสร้างใบสั่งซื้อ | Bearer |
| GET | `/api/purchase-orders` | รายการใบสั่งซื้อ (กรองตามสถานะและบทบาท) | Bearer |
| GET | `/api/purchase-orders/{id}` | รายละเอียดใบสั่งซื้อและประวัติ | Bearer |
| GET | `/api/purchase-orders/{id}/print` | สร้างไฟล์ PO พร้อมพิมพ์ (PDF) | Bearer (Procurement/Admin) |
| PATCH | `/api/purchase-orders/{id}/status` | ปรับสถานะ PO หรือแนบเอกสาร | Bearer (Procurement/Admin) |
| POST | `/api/admin/bbcoin/adjust` | ปรับยอด BBcoin ด้วยตนเอง | Bearer (Admin) |

### ตัวอย่างการตอบกลับ `/api/purchase-orders/{id}`
```json
{
  "id": "po-12345",
  "poNumber": "PO-2024-00015",
  "status": "Sent",
  "totalBbcoin": 320,
  "requester": {"userId": "u-001", "displayName": "Alice"},
  "vendor": {"name": "VendorX", "contactEmail": "orders@vendorx.com"},
  "items": [
    {
      "variantId": "v-001",
      "description": "Hoodie - Navy - L",
      "quantity": 2,
      "unitBbcoinCost": 160
    }
  ],
  "documents": [
    {"type": "printablePo", "url": "https://.../po-2024-00015.pdf"}
  ],
  "timeline": [
    {"status": "Draft", "at": "2024-04-12T09:30:00Z"},
    {"status": "Sent", "at": "2024-04-12T10:05:00Z"}
  ]
}
```

## 11. การออกแบบส่วนหน้า
- แอปพลิเคชัน: `apps/web` สำหรับผู้ใช้ทั่วไปและผู้ดูแล
- เส้นทางหลัก: `/login`, `/shop`, `/shop/:id`, `/cart`, `/checkout`, `/orders`, `/admin/bbcoin`, `/procurement/pos`
- คอมโพเนนต์หลัก: `ShopListComponent`, `ProductDetailComponent`, `CartDrawerComponent`, `CheckoutFormComponent`, `OrderHistoryComponent`, `PoPrintPreviewComponent`
- การจัดการสถานะ: NgRx แยกสโตร์สำหรับ auth, catalog, cart, wallet, purchase orders
- ส่วนติดต่อผู้ใช้: Angular Material พร้อมธีมองค์กร และสไตล์สำหรับการพิมพ์ PO
- การจัดการข้อผิดพลาด: Toast/Snackbar และ Guard ป้องกันการเข้าถึงโดยไม่มีสิทธิ์

## 12. การออกแบบส่วนหลัง
- ตัวควบคุม API แยกตามโมดูล Auth, Catalog, Cart, PurchaseOrders, Administration
- เลเยอร์ Application ใช้ MediatR สำหรับคำสั่ง/คำถาม และ FluentValidation สำหรับตรวจสอบข้อมูลเข้า
- เลเยอร์ Domain กำหนดกฎบัญชี BBcoin และลำดับสถานะ PO
- เลเยอร์ Infrastructure ใช้ SDK ของฐานข้อมูล NoSQL สำหรับจัดการคอลเลกชัน, ไคลเอนต์ SMTP, และตัวเชื่อมต่อบริการ PDF

## 13. การปรับใช้และสภาพแวดล้อม
| สภาพแวดล้อม | URL (ตัวอย่าง) | สาขา | หมายเหตุ |
| --- | --- | --- | --- |
| Dev | https://merch-dev.internal | develop | สำหรับทดสอบฟีเจอร์ |
| Staging | https://merch-stg.internal | release/* | ทดสอบ UAT ร่วมกับฝ่ายจัดซื้อ |
| Prod | https://merch.internal | main | สำหรับผู้ใช้จริง |

- CI/CD ผ่าน Azure DevOps หรือ GitHub Actions สำหรับ Build และ Deploy
- ส่วนหลังบน Azure App Service หรือ Container Apps; ส่วนหน้าบน Azure Static Web Apps หรือ Static Website + CDN
- จัดการความลับผ่าน Azure Key Vault

## 14. กลยุทธ์การทดสอบ
- Unit Test: xUnit + FluentAssertions สำหรับเลเยอร์โดเมน/แอปพลิเคชัน; Jest สำหรับคอมโพเนนต์ Angular
- Integration Test: WebApplicationFactory ทดสอบร่วมกับเอมูเลเตอร์ฐานข้อมูล NoSQL (Cosmos DB Emulator หรือ MongoDB Testcontainer) เพื่อยืนยันกฎ ledger และการสร้าง PO
- End-to-End: Playwright ครอบคลุมขั้นตอนเข้าสู่ระบบ เลือกซื้อ ชำระเงิน และพิมพ์ PO
- PDF Snapshot Test: เปรียบเทียบ HTML ของ PO ที่เรนเดอร์กับเทมเพลตมาตรฐาน
- Performance Test: สคริปต์ k6 สำหรับแคตตาล็อกและขั้นตอน Checkout

## 15. การวิเคราะห์และการมอนิเตอร์
- Application Insights เก็บ Trace สำหรับ API ธุรกรรม BBcoin และเหตุการณ์วงจร PO
- เทเลเมทรีส่วนหน้า: Page View, Conversion ขั้น Checkout, การพิมพ์ PO
- แดชบอร์ดสรุปการแจกจ่าย BBcoin เทียบการใช้จริง เวลาตอบสนอง PO และอัตราความล้มเหลวของการแจ้งเตือน

## 16. ความเสี่ยงและคำถามค้างคา
- การปรับนโยบาย BBcoin (วันหมดอายุ การโอนย้าย) อาจมีผลต่อโครงสร้างเอกสารและดัชนี
- ขั้นตอนรับผู้ขายใหม่ และกรณีต้องมีหลายผู้ขายในใบสั่งซื้อเดียว
- SLA ของบริการสร้าง PDF และจำเป็นต้องพิมพ์ได้ในกรณีออฟไลน์หรือไม่
- ข้อกำหนดการเก็บข้อมูลธุรกรรม BBcoin เกิน 7 ปี

## 17. โรดแมป
1. สัปดาห์ 1-2: โมดูลยืนยันตัวตน, ระบบกระเป๋า BBcoin, โครงแคตตาล็อก
2. สัปดาห์ 3-4: รถเข็นและชำระเงิน, การตัด BBcoin, โมเดล PO
3. สัปดาห์ 5-6: บริการพิมพ์ PDF, ระบบแจ้งเตือน, ฟังก์ชันปรับยอด
4. สัปดาห์ 7: ทดสอบ End-to-End และ Performance, รองรับ UAT ฝ่ายจัดซื้อ
5. สัปดาห์ 8: เปิดใช้งานจริงและดูแลช่วงต้น

## 18. ภาคผนวก
- ดีไซน์องค์กร: สีหลัก yellow, สีรอง black; เทมเพลต PO ใช้สีขาว-ดำพร้อมโลโก้
- แนวทางคอนเทนต์: ภาพสินค้าอย่างน้อย 1200px, เทมเพลต PO ผ่านการทบทวนจากฝ่ายกฎหมาย
