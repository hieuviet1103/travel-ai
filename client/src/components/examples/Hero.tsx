import Hero from '../Hero';

export default function HeroExample() {
  const handleGetStarted = () => {
    console.log('Get started clicked');
  };

  return <Hero onGetStarted={handleGetStarted} />;
}
