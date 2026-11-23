import { useTranslation } from 'react-i18next'
import { TabScreen, useApp } from '../components'
import { img, useL } from '../data'
import type { LText } from '../i18n'
import './news.css'

const newsItems: { img: string; title: LText; desc: LText }[] = [
  {
    img: 'news-smoothie',
    title: { vi: '🧋“Chiếc máy xay nhỏ cứu nguy cả buổi tiệc!”', en: '🧋“A tiny blender saved the whole party!”' },
    desc: { vi: 'Nhờ mượn máy xay sinh tố trên RentMe, mình kịp chuẩn bị đồ uống mà không cần mua mới. Tiện lợi và tiết kiệm vô cùng!', en: 'Borrowing a blender on RentMe let me make drinks in time without buying a new one. So handy and so cheap!' },
  },
  {
    img: 'news-luggage',
    title: { vi: '🎒“Balo du lịch 3 ngày – không cần mua mới!”', en: '🎒“A 3-day travel backpack – no need to buy!”' },
    desc: { vi: 'Mượn balo từ RentMe cho chuyến Đà Lạt, gọn nhẹ, sạch đẹp, lại thấy vui vì góp phần sống xanh.', en: 'I borrowed a backpack from RentMe for my Da Lat trip – light, clean, and it feels good to live greener.' },
  },
  {
    img: 'news-camera',
    title: { vi: '📷“Mượn máy ảnh – lưu giữ kỷ niệm tốt nghiệp”', en: '📷“Borrow a camera – keep graduation memories”' },
    desc: { vi: 'Không cần bỏ tiền mua máy, mình mượn trên RentMe, chụp xong trả liền. Dễ thương và tiện cực!', en: 'No need to buy a camera – I borrowed one on RentMe and returned it right after. Cute and super convenient!' },
  },
]

const community: { img: string; title: LText; desc: LText }[] = [
  { img: 'comm-kitchen', title: { vi: 'Đồ gia dụng quanh tôi', en: 'Household items near me' }, desc: { vi: 'Nơi mọi người chia sẻ, cho mượn và hỏi mượn đồ gia dụng hằng ngày – từ máy xay, bàn ủi đến nồi cơm điện.', en: 'Where neighbours share, lend and borrow everyday household items – from blenders and irons to rice cookers.' } },
  { img: 'comm-travel', title: { vi: 'RentMe Travel', en: 'RentMe Travel' }, desc: { vi: 'Cộng đồng dành cho ai thích du lịch tiết kiệm – chia sẻ kinh nghiệm mượn đồ cắm trại, balo, vali, lều trại.', en: 'A community for budget travellers – share tips on borrowing camping gear, backpacks, suitcases and tents.' } },
  { img: 'comm-books', title: { vi: 'Học tập - Sách & Dụng cụ', en: 'Study - Books & Supplies' }, desc: { vi: 'Nơi sinh viên trao đổi sách, máy tính, và đồ học tập. Cùng nhau học thông minh, tiêu dùng bền vững.', en: 'Where students swap books, calculators and supplies. Learn smart and consume sustainably together.' } },
]

const activities: { img: string; title: LText }[] = [
  { img: 'act-books', title: { vi: 'Chiến dịch “Tủ sách sẻ chia”', en: '“Sharing Bookshelf” campaign' } },
  { img: 'act-kids', title: { vi: 'Hành trình “Áo ấm đến trường”', en: '“Warm Clothes to School” journey' } },
  { img: 'act-donate', title: { vi: 'Chiến dịch “Đổi đồ – Sống xanh”', en: '“Swap Items – Live Green” campaign' } },
]

export default function News() {
  const { t } = useTranslation()
  const L = useL()
  const { toast } = useApp()

  return (
    <TabScreen>
      <div className="n-hero">
        <div className="n-strip">
          <img src={img('news-top-1')} alt="" />
          <img src={img('news-top-2')} alt="" />
          <img src={img('news-top-3')} alt="" />
        </div>
        <h2>{t('news.campaignTitle')}</h2>
        <p className="sub">{t('news.campaignSub')}</p>
        <p className="time">{t('news.campaignTime')}</p>
        <div className="n-btns">
          <button className="coral" onClick={() => toast(t('common.comingSoon'))}>{t('news.learnMore')}</button>
          <button className="teal" onClick={() => toast(t('common.comingSoon'))}>{t('news.joinCommunity')}</button>
        </div>
      </div>

      <section className="n-card">
        <h3 className="n-ttl dark">{t('news.newsTitle')}</h3>
        {newsItems.map((n) => (
          <article className="n-item" key={n.img}>
            <img src={img(n.img)} alt="" style={n.img === 'news-camera' ? { objectPosition: '50% 80%' } : undefined} />
            <div>
              <b>{L(n.title)}</b>
              <p>{L(n.desc)}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="n-card n-about">
        <h3 className="n-ttl soft">{t('news.aboutTitle')}</h3>
        <div className="n-ab">
          <img src={img('about-save')} alt="" />
          <p>{t('news.about1')}</p>
        </div>
        <div className="n-ab rev">
          <p>{t('news.about2')}</p>
          <img src={img('about-hands')} alt="" />
        </div>
      </section>

      <section className="n-benefits">
        <h3>{t('news.benefitsTitle')}</h3>
        <div className="n-bgrid">
          <img className="m1" src={img('mascot-box')} alt="" />
          <div className="n-bcol">
            <div className="n-b"><b>{t('news.b1t')}</b><p>{t('news.b1d')}</p></div>
            <div className="n-b"><b>{t('news.b2t')}</b><p>{t('news.b2d')}</p></div>
          </div>
        </div>
        <div className="n-bgrid two">
          <div className="n-bcol">
            <div className="n-b"><b>{t('news.b3t')}</b><p>{t('news.b3d')}</p></div>
            <div className="n-b"><b>{t('news.b4t')}</b><p>{t('news.b4d')}</p></div>
          </div>
          <img className="m2" src={img('mascot-wave')} alt="" />
        </div>
      </section>

      <section className="n-comm">
        <div className="n-comm-h"><h3>{t('news.communityTitle')} <span>RentMe</span></h3></div>
        {community.map((c) => (
          <div className="n-crow" key={c.img}>
            <img src={img(c.img)} alt="" />
            <div>
              <b>{L(c.title)}</b>
              <p>{L(c.desc)}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="n-acts">
        <h3>{t('news.activitiesTitle')}</h3>
        <div className="n-arow">
          {activities.map((a) => (
            <div className="n-act" key={a.img}>
              <img src={img(a.img)} alt="" />
              <b>{L(a.title)}</b>
            </div>
          ))}
        </div>
      </section>
    </TabScreen>
  )
}
