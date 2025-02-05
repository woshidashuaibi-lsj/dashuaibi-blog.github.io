import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Top from '../../component/top/index'
import './page.css'
import '../../page.css'


function markdownToTree(markdown) {
  const lines = markdown.split('\n');
  const tree = [];
  const stack = []; // 用于跟踪各级标题的父节点

  lines.forEach(line => {
    const match = line.match(/^(#+)\s+(.+)/);
    if (!match) return;

    const level = match[1].length; // 标题级别（如 ## 对应 level=2）
    const title = match[2].trim();
    const node = { id: title, title: title };

    // 关键逻辑：寻找父节点
    while (stack.length >= level) {
      stack.pop(); // 清除同级或低级节点
    }

    const parent = stack[stack.length - 1];
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(node);
    } else {
      tree.push(node);
    }

    stack.push(node); // 当前节点成为新的父节点
  });

  return tree;
}

// 如果需要为每个动态路径生成静态参数
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  const files = fs.readdirSync(postsDirectory);

  return files.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}

const Post = ({ params }) => {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  // 提取标题
  const postFilePath = path.join(postsDirectory, `${params.slug}.md`);
  if (!fs.existsSync(postFilePath)) {
    return <div>Post not found</div>;
  }
  const markdownWithMeta = fs.readFileSync(path.join(postsDirectory, `${params.slug}.md`), 'utf-8');
  const { data: frontMatter, content } = matter(markdownWithMeta);
  const processedContent = remark().use(html).processSync(content).toString();

  // 提取标题
  console.log(markdownWithMeta,"markdownWithMeta")
  const nestedHeadings = markdownToTree(markdownWithMeta);
  console.log(nestedHeadings,"nestedHeadings")
  // 渲染导航目录
  const renderNav = (headings) => (
    <ul>
      {headings.map(({ title, children }, index) => (
        <li key={index}>
          <a href={`#${title.toLowerCase().replace(/\s+/g, '-')}`}>{title}</a>
          {children && children.length > 0 && renderNav(children)}
        </li>
      ))}
    </ul>
  );

  return (
    <div >
      <div className='home'>
        <Top />
      </div>
      <div className='blog-single'>
        <h1 className='blog-title'>{frontMatter.title}</h1>
        <p><small>{frontMatter.date} &nbsp;·{frontMatter.readtime} &nbsp;·{frontMatter.words}</small></p>
        {/* 导航目录 */}
        <div className="blog-toc">
          <nav id="TableOfContents">
            {renderNav(nestedHeadings)}
          </nav>
        </div>
        

        <div dangerouslySetInnerHTML={{ __html: processedContent }} />
      </div>
    </div>
  );
};

export default Post;