import { useTranslation } from 'react-i18next'
import type { LText } from './i18n'

const files = import.meta.glob('./assets/img/*.webp', { eager: true, import: 'default' }) as Record<string, string>
export const img = (name: string): string => files[`./assets/img/${name}.webp`] ?? ''

/** Pick the right language from a bilingual text */
export function useL() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'vi'
  return (t: LText | string) => (typeof t === 'string' ? t : t[lang])
}

export const fmtVnd = (n: number) => n.toLocaleString('vi-VN').replace(/,/g, '.')

export type Product = {
  id: string
  name: LText
  short: LText
  image: string
  price: number
  deposit: number
  trust: number
  borrows: number
  category: 'camera' | 'gaming' | 'sport' | 'accessory' | 'fashion'
  owner: string
  location: LText
}

const q1: LText = { vi: 'Quận 1, TP Hồ Chí Minh', en: 'District 1, Ho Chi Minh City' }

export const products: Product[] = [
  { id: 'keyboard', name: { vi: 'Bàn phím cơ RAINBOW GEAR K104', en: 'RAINBOW GEAR K104 Mechanical Keyboard' }, short: { vi: 'Bàn phím cơ', en: 'Mechanical keyboard' }, image: 'p-keyboard', price: 100000, deposit: 300000, trust: 90, borrows: 30, category: 'gaming', owner: 'binh', location: q1 },
  { id: 'r50', name: { vi: 'Máy ảnh Canon EOS R50', en: 'Canon EOS R50 Camera' }, short: { vi: 'Máy ảnh', en: 'Camera' }, image: 'p-r50', price: 450000, deposit: 300000, trust: 90, borrows: 40, category: 'camera', owner: 'binh', location: q1 },
  { id: '800d', name: { vi: 'Máy ảnh EOS 800D', en: 'EOS 800D Camera' }, short: { vi: 'Máy ảnh', en: 'Camera' }, image: 'ord-canon60d', price: 450000, deposit: 300000, trust: 93, borrows: 40, category: 'camera', owner: 'binh', location: q1 },
  { id: 'hobo', name: { vi: 'Túi xách nữ Hobo', en: 'Hobo Women’s Handbag' }, short: { vi: 'Túi xách', en: 'Handbag' }, image: 'p-hobo', price: 450000, deposit: 300000, trust: 90, borrows: 40, category: 'fashion', owner: 'binh', location: q1 },
  { id: 'watch', name: { vi: 'Apple watch series 10', en: 'Apple Watch Series 10' }, short: { vi: 'Đồng hồ', en: 'Watch' }, image: 'p-watch', price: 450000, deposit: 300000, trust: 90, borrows: 40, category: 'accessory', owner: 'binh', location: q1 },
  { id: 'blazer', name: { vi: 'Áo khoác blazer nữ', en: 'Women’s Blazer' }, short: { vi: 'Áo khoác', en: 'Blazer' }, image: 'p-blazer', price: 450000, deposit: 300000, trust: 90, borrows: 40, category: 'fashion', owner: 'binh', location: q1 },
  { id: 'nikon', name: { vi: 'Máy ảnh Nikon P310', en: 'Nikon P310 Camera' }, short: { vi: 'Máy ảnh', en: 'Camera' }, image: 'p-nikon', price: 450000, deposit: 300000, trust: 90, borrows: 40, category: 'camera', owner: 'binh', location: q1 },
  { id: 'pocket2', name: { vi: 'Máy quay cầm tay Feiyu Pocket 2', en: 'Feiyu Pocket 2 Handheld Camera' }, short: { vi: 'Máy quay', en: 'Camcorder' }, image: 'p-pocket2', price: 450000, deposit: 300000, trust: 90, borrows: 40, category: 'camera', owner: 'binh', location: q1 },
]

export const featured = [
  { name: { vi: 'Máy ảnh Canon EOS 800D', en: 'Canon EOS 800D Camera' }, image: 'feat-canon800d', cond: { vi: 'Used', en: 'Used' }, km: '2.5 km', pid: '800d' },
  { name: { vi: 'Laptop MacBook Air M2', en: 'MacBook Air M2 Laptop' }, image: 'feat-macbook', cond: { vi: 'Like new', en: 'Like new' }, km: '1.8 km', pid: 'r50' },
  { name: { vi: 'Gimbal DJI OM 6', en: 'DJI OM 6 Gimbal' }, image: 'feat-gimbal', cond: { vi: 'Like new', en: 'Like new' }, km: '1.2 km', pid: 'pocket2' },
  { name: { vi: 'GoPro Hero 12', en: 'GoPro Hero 12' }, image: 'feat-gopro', cond: { vi: 'Like new', en: 'Like new' }, km: '2.8 km', pid: 'pocket2' },
]

export type Contact = { id: string; name: string; avatar: string; last: LText }
export const contacts: Contact[] = [
  { id: 'binh', name: 'Tô Lê Bình', avatar: 'av-binh', last: { vi: 'Shop gửi hàng cho tui nhanh nha', en: 'Please ship it to me quickly' } },
  { id: 'tanphat', name: 'Tấn Phát', avatar: 'av-tanphat', last: { vi: 'dạ em cảm ơn', en: 'thank you so much' } },
  { id: 'phongphu', name: 'Phong Phú', avatar: 'av-phongphu', last: { vi: 'gửi cho mình ảnh thật với đc k', en: 'can you send me real photos?' } },
  { id: 'lymai', name: 'Lý Mai', avatar: 'av-lymai', last: { vi: 'Nhanh không ạ', en: 'Is it fast?' } },
  { id: 'phucle', name: 'Phúc Lê', avatar: 'av-phucle', last: { vi: 'Hỏa tốt là nhận trong ngày hả shop', en: 'Express means same-day, right?' } },
  { id: 'quocthinh', name: 'Quốc Thịnh', avatar: 'av-quocthinh', last: { vi: 'Hỏa tốt là nhận trong ngày hả shop', en: 'Express means same-day, right?' } },
  { id: 'myngoc', name: 'Mỹ Ngọc', avatar: 'av-myngoc', last: { vi: 'Hỏa tốt là nhận trong ngày hả shop', en: 'Express means same-day, right?' } },
  { id: 'pam', name: 'Pam', avatar: 'av-pam', last: { vi: 'Shop gửi hàng cho tui nhanh nha', en: 'Please ship it to me quickly' } },
]

export type ChatMsg = { me: boolean; text: LText; time: string }
export const chatThread: ChatMsg[] = [
  { me: true, text: { vi: 'Shop ơi em muốn hỏi chi tiết về giá ạ', en: 'Hi, I’d like to ask about the price' }, time: '19:20' },
  { me: false, text: { vi: 'Chào em', en: 'Hi there' }, time: '19:21' },
  { me: false, text: { vi: 'Giá 100k cùng tiền cọc như trên nhé', en: 'It’s 100k plus the deposit shown above' }, time: '19:21' },
  { me: true, text: { vi: 'Vậy dùng chơi game được không ạ', en: 'Is it good for gaming?' }, time: '19:21' },
  { me: true, text: { vi: 'Nếu em trả muộn có thêm phí không shop', en: 'Is there a fee if I return it late?' }, time: '19:22' },
  { me: false, text: { vi: 'Cái này dùng chơi game mượt', en: 'It’s very smooth for gaming' }, time: '19:40' },
  { me: true, text: { vi: 'Em cảm ơn ạ', en: 'Thank you' }, time: '19:45' },
  { me: false, text: { vi: 'Mượn luôn không em', en: 'Want to borrow it now?' }, time: '20:19' },
  { me: false, text: { vi: 'Nếu trả trễ thì thêm 5% phí cọc nha em', en: 'Late returns add a 5% deposit fee' }, time: '20:19' },
  { me: true, text: { vi: 'Khi nào nhận được đồ ạ', en: 'When will I receive it?' }, time: '20:20' },
  { me: false, text: { vi: 'Tùy vào khu vực mà em ở nhe', en: 'It depends on where you live' }, time: '20:20' },
  { me: true, text: { vi: 'Em cảm ơn shop ạ', en: 'Thanks a lot!' }, time: '20:21' },
]
