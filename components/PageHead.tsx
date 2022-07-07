import type {NextPage} from 'next'
import Head from 'next/head'

type Props = {
  title?: string;
  desc?: string;
}

const PageHead: NextPage<Props> = props => {
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href={"/apple-touch-icon.png"}/>
      <link rel="icon" type="image/png" sizes="32x32" href={"/favicon-32x32.png"}/>
      <link rel="icon" type="image/png" sizes="16x16" href={"/favicon-16x16.png"}/>
      <link rel="manifest" href={"/site.webmanifest"}/>

      {(props.title && <title> KeySafe | {props.title}</title>) || <title>KeySafe</title>}
      {(props.desc && <meta name="description" content={props.desc}/>) ||
          <meta name="description" content="A cloud-based, open source, secure password manager."/>}
    </Head>
  )
}

export default PageHead
