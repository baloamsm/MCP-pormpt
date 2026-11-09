// عرض الماركداون داخل Server Component — صفر جافاسكربت على العميل لهذا الجزء
import type { ComponentProps } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// الجداول تُغلَّف بحاوية قابلة للتمرير أفقيًا حتى تظل الصفوف متساوية على الموبايل
type TableProps = ComponentProps<"table"> & { node?: unknown };

function TableBlock({ node, ...rest }: TableProps) {
  return (
    <div className="md-table-scroll">
      <table {...rest} />
    </div>
  );
}

const components: Components = { table: TableBlock };

export function MdBody({ text }: { text: string }) {
  return (
    <div className="md-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {text}
      </ReactMarkdown>
    </div>
  );
}
