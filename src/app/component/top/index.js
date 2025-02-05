 

import Link from 'next/link';
import './index.css'

const Top = ({ params }) => {

  return (
    <div className='home'>
      <nav className="navigation"><section className="container">
        <Link className="navigation-brand" href="/" >主页</Link>
        <ul className="navigation-list" id="navigation-list">
          <li className="navigation-item navigation-menu">
            <Link className="navigation-link" href="/">文章</Link>
          </li>
          <li className="navigation-item navigation-menu">
            <Link className="navigation-link" href="/">即兴</Link>
          </li>
          <li className="navigation-item navigation-menu">
            <Link className="navigation-link" href="/">历史文章</Link>
          </li>
          {/* <li className="navigation-item navigation-menu">
            <a className="navigation-link" href="/guestbook">留言板</a></li>
          <li className="navigation-item navigation-menu">
            <a className="navigation-link" href="https://analytics.guangzhengli.com/share/o3zAba1V/guangzhengli">网站统计</a>
          </li> */}
          <li className="navigation-item menu-separator"><span>|</span></li>
          <li className="navigation-item navigation-social">
            <a className="navigation-link" href="https://github.com/woshidashuaibi-lsj">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37.0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44.0 0020 4.77 5.07 5.07.0 0019.91 1S18.73.65 16 2.48a13.38 13.38.0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07.0 005 4.77 5.44 5.44.0 003.5 8.55c0 5.42 3.3 6.61 6.44 7A3.37 3.37.0 009 18.13V22"></path></svg>
            </a>
          </li>
          {/* <li className="navigation-item navigation-social">
            <a className="navigation-link" href="https://twitter.com/iguangzhengli"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter"><path d="M23 3a10.9 10.9.0 01-3.14 1.53 4.48 4.48.0 00-7.86 3v1A10.66 10.66.0 013 4s-4 9 5 13a11.64 11.64.0 01-7 2c9 5 20 0 20-11.5a4.5 4.5.0 00-.08-.83A7.72 7.72.0 0023 3z"></path></svg></a>
          </li>
          <li className="navigation-item navigation-dark">
            <button id="mode" type="button" aria-label="toggle user light or dark theme">
            <span className="toggle-dark"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg></span><span className="toggle-light"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg></span></button>
          </li>
          <li className="navigation-item navigation-language"><a href="https://guangzhengli.com/en/">EN</a></li> */}
        </ul>
        </section>
      </nav>
      <div>
      </div>
      
    </div>
  );
};

export default Top;