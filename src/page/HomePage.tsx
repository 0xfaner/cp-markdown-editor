import React from 'react'
import { useReactToPrint } from 'react-to-print';
import { renderToHTML } from '@/service/rendererService'
import style from './HomePage.module.css'
import './print.css'

export const HomePage: React.FC = () => {
  const componentRef = React.useRef(null);
  const result = useReactToPrint({
    content: () => componentRef.current,
  });
  const [text, setText] = React.useState('')
  const [html, setHtml] = React.useState('')

  React.useEffect(() => {
    try {
      const result = renderToHTML(text)
      setHtml(result)
    } catch (err) {
    }
  }, [text])

  return (
    <div className={style.page}>
      <button className='print-button' type="button" onClick={result}>Print</button>
      <div className={style.content}>
        <textarea
          className={style.input}
          placeholder='Input markdown here'
          value={text}
          spellCheck={false}
          onChange={e => setText(e.target.value)}
          autoComplete='off'
        />
        <div className={style.preview}>
          <div ref={componentRef}
            dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div >
  )
}

