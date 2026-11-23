import { useTranslation } from 'react-i18next'
import { ChevronRight } from 'lucide-react'
import { TabScreen, useApp } from '../components'
import { img, useL } from '../data'
import type { LText } from '../i18n'
import './sub.css'

const promos: { img: string; title: LText; desc: LText; n: number }[] = [
  { img: 'n-sale', title: { vi: 'Khuyến mãi', en: 'Promotions' }, desc: { vi: 'Mã đã có sẵn trong ví của bạn, áp dụng ngay hôm nay!', en: 'Codes are in your wallet – use them today!' }, n: 2 },
  { img: 'n-update', title: { vi: 'Cập nhật RentMe', en: 'RentMe updates' }, desc: { vi: 'Chỉ 2 phút chia sẻ để cải thiện kinh nghiệm sử dụng', en: 'Spend 2 minutes to help us improve your experience' }, n: 11 },
  { img: 'n-gift', title: { vi: 'Giải thưởng RentMe', en: 'RentMe rewards' }, desc: { vi: 'Chỉ cần mở quà là 100% có voucher! Mở ngay', en: 'Open the gift for a guaranteed voucher! Open now' }, n: 3 },
  { img: 'n-voucher', title: { vi: 'Voucher', en: 'Vouchers' }, desc: { vi: 'Voucher đã được cập nhật trong ví, nhanh tay sử dụng', en: 'New vouchers are in your wallet, use them fast' }, n: 7 },
]

type N = { img: string; title: LText; desc: LText; time: LText }
const borrowN: N[] = [
  { img: 'feat-canon800d', title: { vi: 'Đơn mượn đã được xác nhận', en: 'Borrow order confirmed' }, desc: { vi: 'Người cho mượn Máy ảnh Canon EOS 800D đã xác nhận yêu cầu của bạn. Hãy chuẩn bị nhận hàng nhé! 📦', en: 'The lender of the Canon EOS 800D confirmed your request. Get ready to receive it! 📦' }, time: { vi: '10:45 • Hôm nay', en: '10:45 • Today' } },
  { img: 'n-tent', title: { vi: 'Đơn mượn đang được giao', en: 'Borrow order on the way' }, desc: { vi: 'Bộ lều cắm trại NatureHike của bạn đang trên đường đến! Hãy kiểm tra lại thời gian nhận để thuận tiện hơn ⛺', en: 'Your NatureHike camping tent is on its way! Check the delivery time to be ready ⛺' }, time: { vi: '18:20 • Hôm qua', en: '18:20 • Yesterday' } },
  { img: 'n-drill', title: { vi: 'Đơn mượn đã hoàn tất', en: 'Borrow order completed' }, desc: { vi: 'Bạn đã trả lại Máy khoan Bosch GSB 550 thành công. Cảm ơn bạn đã sử dụng RentMe, hẹn gặp lại nhé! 💚', en: 'You returned the Bosch GSB 550 drill. Thanks for using RentMe, see you again! 💚' }, time: { vi: '09:10 • 01/11/2025', en: '09:10 • 01/11/2025' } },
  { img: 'n-jbl', title: { vi: 'Đơn mượn đã bị hủy', en: 'Borrow order cancelled' }, desc: { vi: 'Yêu cầu mượn Loa Bluetooth JBL Flip 6 của bạn đã bị người cho mượn từ chối 🎧', en: 'Your request for the JBL Flip 6 speaker was declined by the lender 🎧' }, time: { vi: '15:32 • 30/10/2025', en: '15:32 • 30/10/2025' } },
]
const lendN: N[] = [
  { img: 'feat-canon800d', title: { vi: 'Có yêu cầu mượn mới', en: 'New borrow request' }, desc: { vi: 'Trần Minh Khôi muốn mượn Máy ảnh Canon EOS 800D của bạn trong 3 ngày tới. Kiểm tra nhé! 📷', en: 'Tran Minh Khoi wants to borrow your Canon EOS 800D for the next 3 days. Take a look! 📷' }, time: { vi: '08:05 • Hôm nay', en: '08:05 • Today' } },
  { img: 'n-marshall', title: { vi: 'Đơn cho mượn đã được giao', en: 'Lending order delivered' }, desc: { vi: 'Loa Marshall Acton III đã được bàn giao thành công. Bạn sẽ nhận tiền sau khi họ xác nhận đủ điều kiện 🎶', en: 'The Marshall Acton III was handed over. You’ll be paid once the borrower confirms 🎶' }, time: { vi: '19:15 • Hôm qua', en: '19:15 • Yesterday' } },
  { img: 'n-toolbox', title: { vi: 'Đồ đã được trả', en: 'Item returned' }, desc: { vi: 'Người mượn Bộ dụng cụ sửa xe Ingco đã hoàn tất trả hàng.', en: 'The borrower has returned the Ingco repair toolkit.' }, time: { vi: '13:40 • 02/11/2025', en: '13:40 • 02/11/2025' } },
  { img: 'n-macbook', title: { vi: 'Nhận được đánh giá mới', en: 'New review received' }, desc: { vi: 'Bạn vừa nhận được đánh giá 5⭐ cho đơn Laptop MacBook Air M2!', en: 'You just got a 5⭐ review for the MacBook Air M2 order!' }, time: { vi: '09:55 • 01/11/2025', en: '09:55 • 01/11/2025' } },
]

export default function Notifications() {
  const { t } = useTranslation()
  const L = useL()
  const { toast } = useApp()
  return (
    <TabScreen fab={false}>
      <div className="nt">
        {promos.map((p) => (
          <button className="nt-promo" key={p.img} onClick={() => toast(t('common.comingSoon'))}>
            <img src={img(p.img)} alt="" />
            <div><b>{L(p.title)}</b><span>{L(p.desc)}</span></div>
            <i>{p.n}</i>
            <ChevronRight size={20} />
          </button>
        ))}
        <h4>{t('notif.lendUpdates')}</h4>
        {borrowN.map((n) => <NRow key={n.img + n.time.vi} n={n} />)}
        <h4>{t('notif.lenderUpdates')}</h4>
        {lendN.map((n) => <NRow key={n.img + n.time.vi} n={n} />)}
      </div>
    </TabScreen>
  )
}

function NRow({ n }: { n: N }) {
  const { t } = useTranslation()
  const L = useL()
  return (
    <div className="nt-row">
      <img src={img(n.img)} alt="" />
      <div>
        <b>{L(n.title)}</b>
        <p>{L(n.desc)}</p>
        <span>{t('notif.time', { v: L(n.time) })}</span>
      </div>
    </div>
  )
}
