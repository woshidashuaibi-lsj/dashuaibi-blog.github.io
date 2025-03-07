import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from "next/image";
import Top from './component/top/index'
import './page.css'
import AvatarImage from './component/avatarImage/index.js';


// 如果需要为每个动态路径生成静态参数
export async function generateStaticParams() {
  // 使用正确的路径指向 posts 目录
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  const files = fs.readdirSync(postsDirectory);

  return files.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}

const Page = ({ params }) => {
  // 同样使用正确的路径指向 posts 目录
  const postsDirectory = path.join(process.cwd(), 'posts');
  const files = fs.readdirSync(postsDirectory);
  console.log(files,"iles")
  
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join(postsDirectory, filename), 'utf-8');
    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      frontMatter,
      slug: filename.replace('.md', ''),
    };
  });


  return (
    <div className='home'>
      <Top />
      <div>
      <div className="info">
        <div className="intro">
          <h1>卢穗杰</h1>
          <small>百年里，浑教是醉。三万六千场。</small>
          <p></p>
          <p>天真的理想主义者</p>
          <p></p>
        </div>
        <div className="avatar">
          <AvatarImage />
        </div>
        </div>
      </div>
      <div className='featured' >
        <h2>推荐阅读</h2>
        <ul className='featured-list'>
          {posts.map(({ slug, frontMatter }) => (
            <Link key={slug} href={`/posts/${slug}`}>
              <li key={slug} className='featured-single'>
                <h4 href={`/posts/${slug}`}>{frontMatter.title}</h4> 
                <p>
                  <small>
                    {frontMatter.date} &nbsp;·{frontMatter.readtime} &nbsp;·{frontMatter.words}
                  </small>
                </p>
                <p></p>
                <p>
                  {frontMatter.description}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default Page;