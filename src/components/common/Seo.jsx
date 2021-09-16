import { Helmet } from 'react-helmet';

function Seo(props) {
  const defaults = {
    title: 'Netflix',
    description:
      'Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.',
  };

  const title = props.title || defaults.title;
  const description = props.description || defaults.description;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}

export default Seo;
