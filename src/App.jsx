import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  'James Hayes', 'BBQS', 'Switched On', 'Lifeline Fitness', 'InsuredCan',
  'Fire Knott', 'Elite Educational & Visa', 'Rajasthani Exports',
  'Spark Formulations', 'Bionam Pharmacos', 'Kleda', 'Gulati Travels',
  'Droneveer Academy', 'AdviPure', 'Journey of Himalaya', 'SlidesBrain',
  'KaufmanIT', 'CBD India Online', 'Him Tour & Travel', 'Manali Trip Package',
  'Airlines O Ticket', 'CIC Life Care', 'Impileo Healthcare', 'Htlogics',
];

const services = [
  {
    name: 'SEO Services',
    description: 'Improve search rankings and drive consistent organic traffic to your website.',
    points: ['Keyword research & strategy', 'On-page SEO', 'Technical SEO', 'Link building', 'Local SEO', 'SEO audit', 'E-commerce SEO', 'Competitor analysis'],
    slug: 'seo-services',
  },
  {
    name: 'PPC & Ads',
    description: 'Generate quality leads through optimized Google Ads campaigns, and reach targeted audiences with high-converting Facebook and Instagram advertising.',
    points: ['Google Ads management', 'Search campaigns', 'Display advertising', 'Remarketing', 'Social media advertising'],
    slug: 'ppc-services',
  },
  {
    name: 'Lead Generation',
    description: 'Turn attention into enquiries with focused journeys, strong landing pages and multi-channel outreach.',
    points: ['B2B lead generation', 'Landing page optimization', 'Social media lead generation', 'Email marketing', 'Sales funnels'],
    slug: 'lead-generations',
  },
  {
    name: 'Website Design',
    description: 'Custom website designs tailored to your brand, audience and goals — with responsive layouts, clear navigation and a professional visual experience.',
    points: ['Custom design', 'Responsive design', 'UI/UX design', 'Landing page design', 'Website redesign'],
    slug: 'website-design',
  },
  {
    name: 'Website Development',
    description: 'Fast, secure, scalable and responsive websites built to support business growth, with flexible, SEO-friendly WordPress builds and custom development.',
    points: ['Custom development', 'WordPress', 'Maintenance & support', 'AI development services'],
    slug: 'website-development',
  },
  {
    name: 'E-commerce',
    description: 'Secure, mobile-friendly online stores with smooth navigation, payment integration, product management and conversion-focused features for better online sales.',
    points: ['WooCommerce', 'Shopify', 'Payment integration', 'Product management'],
    slug: 'e-commerce-development',
  },
  {
    name: 'Graphic Design',
    description: 'Visual identity and marketing creatives that keep your brand consistent across every channel.',
    points: ['Logo design', 'Brand identity', 'Social media graphics', 'Banners & ads', 'Brochures & flyers', 'Packaging'],
    slug: 'graphic-design',
  },
];

const serviceArt = [
  <svg key="seo" viewBox="0 0 320 150" aria-hidden="true" focusable="false">
    <rect x="30" y="18" width="260" height="28" rx="14" fill="#fff" />
    <circle cx="52" cy="32" r="6" fill="none" stroke="#3765B0" strokeWidth="2.5" />
    <rect x="68" y="29" width="110" height="6" rx="3" fill="#3765B0" opacity=".4" />
    <rect x="30" y="58" width="260" height="22" rx="4" fill="#D51F2B" />
    <rect x="40" y="66" width="120" height="6" rx="3" fill="#fff" />
    <rect x="30" y="88" width="260" height="22" rx="4" fill="#fff" opacity=".9" />
    <rect x="40" y="96" width="90" height="6" rx="3" fill="#3765B0" opacity=".5" />
    <rect x="30" y="118" width="260" height="22" rx="4" fill="#fff" opacity=".6" />
  </svg>,
  <svg key="ads" viewBox="0 0 320 150" aria-hidden="true" focusable="false">
    <rect x="50" y="20" width="150" height="110" rx="8" fill="#fff" />
    <rect x="62" y="32" width="40" height="14" rx="3" fill="#D51F2B" />
    <rect x="62" y="56" width="120" height="8" rx="4" fill="#000" opacity=".8" />
    <rect x="62" y="72" width="90" height="6" rx="3" fill="#000" opacity=".3" />
    <rect x="62" y="98" width="70" height="22" rx="4" fill="#3765B0" />
    <path d="M230 40L230 100L246 86L258 112L268 107L256 82L276 80Z" fill="#000" stroke="#fff" strokeWidth="3" />
    <circle cx="250" cy="52" r="14" fill="none" stroke="#fff" strokeWidth="3" opacity=".6" />
  </svg>,
  <svg key="leads" viewBox="0 0 320 150" aria-hidden="true" focusable="false">
    <path d="M60 20H260L240 52H80Z" fill="#fff" />
    <path d="M84 60H236L220 92H100Z" fill="#fff" opacity=".8" />
    <path d="M106 100H214L200 130H120Z" fill="#D51F2B" />
    <circle cx="160" cy="36" r="5" fill="#3765B0" />
  </svg>,
  <svg key="design" viewBox="0 0 320 150" aria-hidden="true" focusable="false">
    <rect x="40" y="16" width="170" height="118" rx="8" fill="#fff" />
    <rect x="40" y="16" width="170" height="16" rx="8" fill="#000" opacity=".1" />
    <rect x="52" y="44" width="90" height="10" rx="4" fill="#000" />
    <rect x="52" y="60" width="120" height="6" rx="3" fill="#000" opacity=".3" />
    <rect x="52" y="108" width="50" height="16" rx="4" fill="#D51F2B" />
    <circle cx="150" cy="96" r="14" fill="#3765B0" />
    <rect x="226" y="30" width="54" height="40" rx="6" fill="#fff" opacity=".85" />
    <rect x="226" y="78" width="54" height="40" rx="6" fill="#D51F2B" />
  </svg>,
  <svg key="development" viewBox="0 0 320 150" aria-hidden="true" focusable="false">
    <rect x="40" y="16" width="240" height="118" rx="8" fill="#000" />
    <circle cx="56" cy="30" r="4" fill="#D51F2B" />
    <circle cx="70" cy="30" r="4" fill="#fff" opacity=".5" />
    <rect x="56" y="48" width="70" height="7" rx="3" fill="#D51F2B" />
    <rect x="72" y="64" width="130" height="7" rx="3" fill="#fff" opacity=".8" />
    <rect x="72" y="80" width="100" height="7" rx="3" fill="#3765B0" />
    <rect x="72" y="96" width="150" height="7" rx="3" fill="#fff" opacity=".5" />
    <rect x="56" y="112" width="40" height="7" rx="3" fill="#D51F2B" />
  </svg>,
  <svg key="ecommerce" viewBox="0 0 320 150" aria-hidden="true" focusable="false">
    <rect x="60" y="16" width="110" height="118" rx="8" fill="#fff" />
    <rect x="70" y="26" width="90" height="56" rx="4" fill="#3765B0" opacity=".35" />
    <rect x="70" y="92" width="70" height="7" rx="3" fill="#000" opacity=".7" />
    <rect x="70" y="108" width="40" height="14" rx="4" fill="#D51F2B" />
    <circle cx="238" cy="66" r="34" fill="#fff" />
    <path d="M220 56H230L238 80H260L264 62H233" fill="none" stroke="#3765B0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="240" cy="92" r="4" fill="#D51F2B" />
    <circle cx="258" cy="92" r="4" fill="#D51F2B" />
  </svg>,
  <svg key="graphic" viewBox="0 0 320 150" aria-hidden="true" focusable="false">
    <circle cx="110" cy="75" r="46" fill="#fff" />
    <rect x="130" y="40" width="80" height="80" rx="6" fill="#D51F2B" />
    <path d="M230 120L270 40L300 120Z" fill="#000" />
    <circle cx="110" cy="75" r="18" fill="#3765B0" />
  </svg>,
];

const caseStudies = [
  {
    category: 'Presentation design', name: 'SlidesBrain', label: 'Case study',
    title: '10,000+ high-impact presentations delivered for global clients',
    description: 'Scaling a platform already offering PowerPoint templates and Google Slides solutions.',
    href: 'https://robtechworld.com/how-rob-tech-world-helped-slidesbrain-rank-globally/', link: 'Read the story →',
  },
  {
    category: 'SEO · Fitness equipment', name: 'Lifeline Fitness', label: 'SEO case study',
    title: 'High-intent traffic and measurable growth through strategic SEO',
    description: 'A strong fitness brand whose website lacked search visibility, now attracting organic demand.',
    href: 'https://robtechworld.com/case-studies/', link: 'View case studies →',
  },
  {
    category: 'SEO · Cybersecurity IT', name: 'KaufmanIT', label: 'SEO case study',
    title: 'Organic visibility and lead generation for a cybersecurity-focused IT company',
    description: 'Managed IT and security services for US businesses, matched with the search presence to win consistent leads.',
    href: 'https://robtechworld.com/case-studies/', link: 'View case studies →',
  },
  {
    category: 'Success story · Travel', name: 'Journey of Himalaya', label: 'Success story',
    title: 'Ranked for keywords with 1.5L+ search volume',
    description: 'An SEO-focused campaign that created a real search success story.',
    href: 'https://robtechworld.com/how-rob-tech-world-ranked-journey-of-himalaya-for-1-5l-search-volume-keywords/', link: 'Read the story →',
  },
  {
    category: 'Success story · E-commerce', name: 'CBD India Online', label: 'Success story',
    title: 'SEO for CBD products: how we ranked CBD India Online',
    description: 'E-commerce SEO built to put the brand in front of buyers searching online.',
    href: 'https://robtechworld.com/seo-for-cbd-products-how-rob-tech-world-ranked-cbd-india-online/', link: 'Read the story →',
  },
  {
    category: 'Portfolio', name: 'See every website we’ve built', label: 'Portfolio',
    title: 'Web design, SEO and digital marketing projects',
    description: 'Browse the full gallery of client projects across industries.',
    href: 'https://robtechworld.com/portfolio/', link: 'Open the portfolio →',
  },
];

const reviews = [
  {
    initial: 'C', name: 'Cellebration Wellness',
    quote: 'As a business owner, I value quality, speed, and professionalism — and Rob Tech World delivered all three. They built our brand website within week and guided us with clear and practical design suggestions.',
  },
  {
    initial: 'S', name: 'Sonam',
    quote: 'The team is creative and patient with design changes. Robin Singh ensures the final website looks modern, user-friendly, and matches the brand identity perfectly.',
  },
  {
    initial: 'S', name: 'Sanjana Sharma',
    quote: 'Rob Tech World provides excellent SEO services with real ranking improvements. Professional approach, timely results, and strong knowledge of search engine optimization.',
  },
  {
    initial: 'T', name: 'Tarun Aditya',
    quote: 'A dependable Web Development Company in Chandigarh with a skilled technical team. They focus on performance and functionality.',
  },
  {
    initial: 'P', name: 'Priya Kumari',
    quote: 'The owner personally guides clients, which builds a lot of trust. Highly recommended.',
  },
  {
    initial: 'I', name: 'Imran Khan',
    quote: 'Professional design, smooth functionality, timely delivery, and reliable support.',
  },
];

function Logo({ footer = false }) {
  return (
    <a className={`logo${footer ? ' logo-footer' : ''}`} href="#top" aria-label="Rob Tech World home">
      <svg className="logo-symbol" viewBox="0 0 44 44" aria-hidden="true">
        <rect width="44" height="44" rx="10" fill="#D51F2B" />
        <path d="M12 33V11h10.3c6 0 9.7 3.1 9.7 8 0 3.2-1.7 5.6-4.7 6.9L33 33h-8l-4.9-6.2h-1V33H12Zm7.1-12h3.2c1.7 0 2.6-.7 2.6-2s-.9-2-2.6-2h-3.2v4Z" fill="#fff" />
      </svg>
      <span className="logo-name">Rob Tech <b>World</b></span>
    </a>
  );
}

function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

function ServicePanel({ index, panelRef }) {
  const service = services[index];
  return (
    <div ref={panelRef} className="panel" id="panel" role="tabpanel" aria-live="polite" aria-labelledby={`service-tab-${index}`}>
      <div className="art">{serviceArt[index]}</div>
      <div className="pb">
        <Eyebrow>Service 0{index + 1}</Eyebrow>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <div className="chips">
          {service.points.map((point) => <span key={point}>{point}</span>)}
        </div>
        <a className="tlink" href={`https://robtechworld.com/${service.slug}/`}>Explore {service.name} →</a>
      </div>
    </div>
  );
}

function App() {
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const tabsRef = useRef([]);
  const panelHasAnimated = useRef(false);
  const [activeService, setActiveService] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const scope = rootRef.current;
    if (!scope) return undefined;

    let matchMediaContext;
    const refreshOnLoad = () => ScrollTrigger.refresh();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const context = gsap.context(() => {
      // Change the page's base color as each section enters the viewport.
      scope.querySelectorAll('[data-bg]').forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle(self) {
            if (self.isActive) {
              gsap.to(document.body, {
                backgroundColor: section.dataset.bg,
                color: section.dataset.fg,
                duration: prefersReducedMotion ? 0 : 0.6,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }
          },
        });
      });

      // Preserve inline emphasis while wrapping each heading word for the reveal animation.
      scope.querySelectorAll('.split').forEach((heading) => {
        if (heading.dataset.split === 'true') return;
        const wrapTextNodes = (node) => {
          Array.from(node.childNodes).forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
              const fragment = document.createDocumentFragment();
              child.textContent.split(/(\s+)/).forEach((part) => {
                if (!part.trim()) {
                  fragment.appendChild(document.createTextNode(part));
                  return;
                }
                const clip = document.createElement('span');
                const word = document.createElement('span');
                clip.className = 'word-clip';
                word.className = 'wi';
                word.textContent = part;
                clip.appendChild(word);
                fragment.appendChild(clip);
              });
              child.replaceWith(fragment);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
              wrapTextNodes(child);
            }
          });
        };
        wrapTextNodes(heading);
        heading.dataset.split = 'true';
      });

      if (prefersReducedMotion) {
        scope.querySelectorAll('[data-count]').forEach((element) => {
          const decimals = Number(element.dataset.dec || 0);
          element.textContent = Number(element.dataset.count).toFixed(decimals);
        });
        return;
      }

      document.documentElement.classList.add('anim');

      // Hero intro.
      gsap.from('.hero .eyebrow', { y: 20, opacity: 0, duration: 0.7, delay: 0.1 });
      gsap.from('.hero .wi', { yPercent: 110, duration: 1, stagger: 0.06, ease: 'power4.out', delay: 0.2 });
      gsap.from('.hero .rv', { y: 30, opacity: 0, duration: 0.8, stagger: 0.12, delay: 0.7, ease: 'power3.out' });
      gsap.from('.win', { y: 60, opacity: 0, duration: 1.1, stagger: 0.18, delay: 0.5, ease: 'power3.out' });
      gsap.from('.bars b', { scaleY: 0, transformOrigin: 'bottom', duration: 0.9, stagger: 0.08, delay: 1.1, ease: 'back.out(1.4)' });
      gsap.from('.badge', { scale: 0, duration: 0.9, delay: 1.2, ease: 'back.out(1.7)' });

      // Heading and content reveals through the page.
      scope.querySelectorAll('section:not(.hero) .split').forEach((heading) => {
        gsap.from(heading.querySelectorAll('.wi'), {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.05,
          ease: 'power4.out',
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        });
      });
      scope.querySelectorAll('section:not(.hero)').forEach((section) => {
        const revealItems = section.querySelectorAll('.rv, .eyebrow');
        if (revealItems.length) {
          gsap.from(revealItems, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 70%' },
          });
        }
      });

      gsap.from('.tile', {
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.1,
        stagger: 0.18,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: '.tiles', start: 'top 75%' },
      });

      // Parallax on the hero cards and the about composition.
      matchMediaContext = gsap.matchMedia();
      matchMediaContext.add('(min-width: 700px)', () => {
        scope.querySelectorAll('[data-p]').forEach((element) => {
          gsap.to(element, {
            y: Number.parseFloat(element.dataset.p) * 2,
            ease: 'none',
            scrollTrigger: {
              trigger: element.closest('section, .hero') || element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          });
        });
      });

      gsap.from('#tabs li', {
        x: -40, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: '#tabs', start: 'top 80%' },
      });
      scope.querySelectorAll('.row').forEach((row) => {
        gsap.from(row, {
          y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 88%' },
        });
      });

      // Pinned horizontal case-study rail on desktop; cards stack on smaller screens.
      matchMediaContext.add('(min-width: 900px)', () => {
        const track = scope.querySelector('#track');
        if (!track) return undefined;
        const distance = () => track.scrollWidth - window.innerWidth + 40;
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.work .pin',
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate(self) { gsap.set('#prog', { scaleX: self.progress }); },
          },
        });
        return () => gsap.set(track, { clearProps: 'transform' });
      });
      matchMediaContext.add('(max-width: 899px)', () => {
        scope.querySelectorAll('.card').forEach((card) => {
          gsap.from(card, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          });
        });
      });

      scope.querySelectorAll('[data-count]').forEach((element) => {
        const end = Number.parseFloat(element.dataset.count);
        const decimals = Number(element.dataset.dec || 0);
        const counter = { value: 0 };
        element.textContent = counter.value.toFixed(decimals);
        ScrollTrigger.create({
          trigger: element,
          start: 'top 85%',
          once: true,
          onEnter() {
            gsap.to(counter, {
              value: end,
              duration: 2,
              ease: 'power2.out',
              onUpdate() { element.textContent = counter.value.toFixed(decimals); },
            });
          },
        });
      });

      gsap.to('#fill', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '#steps', start: 'top 60%', end: 'bottom 60%', scrub: true },
      });
      scope.querySelectorAll('.step').forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 62%',
          onEnter() { step.classList.add('on'); },
          onLeaveBack() { step.classList.remove('on'); },
        });
      });

      gsap.from('.q', {
        y: 50, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.tgrid', start: 'top 78%' },
      });

      if (document.readyState === 'complete') {
        requestAnimationFrame(refreshOnLoad);
      } else {
        window.addEventListener('load', refreshOnLoad, { once: true });
      }
    }, scope);

    return () => {
      window.removeEventListener('load', refreshOnLoad);
      matchMediaContext?.revert();
      context.revert();
      document.documentElement.classList.remove('anim');
    };
  }, []);

  useEffect(() => {
    if (!panelHasAnimated.current) {
      panelHasAnimated.current = true;
      return undefined;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !panelRef.current) {
      ScrollTrigger.refresh();
      return undefined;
    }
    const content = panelRef.current.children;
    const tween = gsap.fromTo(content,
      { y: 16 },
      {
        y: 0,
        duration: 0.35,
        stagger: 0.04,
        ease: 'power3.out',
        clearProps: 'transform',
        overwrite: 'auto',
        immediateRender: false,
      },
    );
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => tween.revert();
  }, [activeService]);

  const chooseService = (index) => setActiveService(index);
  const handleTabKeyDown = (event, index) => {
    let nextIndex = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % services.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + services.length) % services.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = services.length - 1;
    if (nextIndex !== null) {
      event.preventDefault();
      chooseService(nextIndex);
      tabsRef.current[nextIndex]?.focus();
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app" ref={rootRef}>
      <a className="skip-link" href="#main">Skip to content</a>
      <header id="hd" className={scrolled ? 'solid' : ''}>
        <div className="wrap nav-shell">
          <Logo />
          <nav id="nav" className={menuOpen ? 'open' : ''} aria-label="Main navigation">
            <ul>
              <li><a className="nav-link" href="#about" onClick={closeMenu}>About</a></li>
              <li className="dd">
                <a className="nav-link" href="#services" onClick={closeMenu}>Services <span aria-hidden="true">▾</span></a>
                <div className="dd-menu">
                  <a href="https://robtechworld.com/seo-services/" onClick={closeMenu}>SEO Services</a>
                  <a href="https://robtechworld.com/ppc-services/" onClick={closeMenu}>PPC Services</a>
                  <a href="https://robtechworld.com/lead-generations/" onClick={closeMenu}>Lead Generation</a>
                  <a href="https://robtechworld.com/website-design/" onClick={closeMenu}>Website Design</a>
                  <a href="https://robtechworld.com/website-development/" onClick={closeMenu}>Website Development</a>
                  <a href="https://robtechworld.com/e-commerce-development/" onClick={closeMenu}>E-commerce Development</a>
                  <a href="https://robtechworld.com/graphic-design/" onClick={closeMenu}>Graphic Design</a>
                </div>
              </li>
              <li><a className="nav-link" href="#work" onClick={closeMenu}>Our Work</a></li>
              <li><a className="nav-link" href="#process" onClick={closeMenu}>Process</a></li>
              <li><a className="nav-link" href="https://robtechworld.com/blogs/" onClick={closeMenu}>Blogs</a></li>
              <li className="mobile-contact"><a className="nav-link" href="https://robtechworld.com/contact-us/" onClick={closeMenu}>Contact Us</a></li>
            </ul>
          </nav>
          <a className="btn btn-red nav-cta" href="https://robtechworld.com/contact-us/">Contact Us <i>→</i></a>
          <button
            className="burger"
            id="bg"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <main id="main">
        <div id="top" />
        <section className="hero" data-bg="#000000" data-fg="#ffffff">
          <div className="wrap hero-grid">
            <div>
              <Eyebrow>Web design · Development · Digital marketing</Eyebrow>
              <h1 className="split">Web design that <em>works</em> as hard as you do.</h1>
              <p className="lead rv">Rob Tech World is a trusted web design and development company in India, helping startups and enterprises build fast, scalable, conversion-focused websites — backed by expert designers, developers and SEO.</p>
              <div className="ctas rv">
                <a className="btn btn-red" href="https://robtechworld.com/case-studies/">Our Case Studies <i>→</i></a>
                <a className="btn btn-line" href="https://robtechworld.com/contact-us/">Schedule a Consultation</a>
              </div>
              <div className="proof rv">
                <div><b>7+</b>years of experience</div>
                <div><b>4.9★</b>132 Google reviews</div>
                <div><b>Google</b>Partner agency</div>
              </div>
            </div>
            <div className="stack" aria-hidden="true">
              <div className="badge" data-p="-30"><div><b>7+</b>years<br />building<br />online growth</div></div>
              <div className="win w1" data-p="-18">
                <div className="bar"><i /><i /><i /></div>
                <div className="window-body">
                  <span className="pill">Website Design</span>
                  <h4>Fast. Secure.<br />Built to convert.</h4>
                  <div className="bars"><b style={{ '--h': '30%' }} /><b style={{ '--h': '45%' }} /><b style={{ '--h': '40%' }} /><b style={{ '--h': '62%' }} /><b style={{ '--h': '78%' }} /><b style={{ '--h': '100%' }} /></div>
                </div>
              </div>
              <div className="win w2" data-p="22"><div className="window-body"><span className="pill">SEO · PPC</span><p>More visibility.<br />More qualified leads.</p></div></div>
              <div className="win w3" data-p="-40"><div className="window-body"><p>WordPress · Shopify · Laravel · WooCommerce</p></div></div>
            </div>
          </div>
        </section>

        <div className="logos" data-bg="#ffffff" data-fg="#000000">
          <small>Trusted by businesses across industries</small>
          <div className="marquee" aria-label="Client names">
            <div className="mq" id="mq">
              {[...clients, ...clients].map((client, index) => <span key={`${client}-${index}`}>{client}</span>)}
            </div>
          </div>
        </div>

        <section className="about" id="about" data-bg="#ffffff" data-fg="#000000">
          <div className="wrap about-grid">
            <div className="tiles">
              <div className="tile t1" data-p="-8"><span>Years of industry experience</span><b>7+</b></div>
              <div className="tile t2" data-p="14">Design, development, SEO and strategy under one roof.</div>
              <div className="tile t3" data-p="-14"><b>India HQ · Zirakpur</b>Clients across India, the USA, Canada, the UK, Australia and Dubai.</div>
            </div>
            <div>
              <Eyebrow>About Rob Tech World</Eyebrow>
              <h2 className="split">One team for your design, code and search growth.</h2>
              <p className="rv">Rob Tech World is a full-service web design and development company, helping businesses across India, the USA, Canada, the UK, Australia and Dubai build fast, secure, scalable and user-friendly websites.</p>
              <p className="rv">We combine design, development, SEO and digital strategy to create websites that support real business growth — with a team of 20+ skilled professionals and 400+ projects completed across industries.</p>
              <div className="chips rv">
                {['WordPress', 'Custom development', 'PHP & Laravel', 'WooCommerce', 'Shopify', 'Responsive websites'].map((chip) => <span key={chip}>{chip}</span>)}
              </div>
              <div className="ctas rv">
                <a className="btn btn-blue" href="https://robtechworld.com/about-us/">About Us <i>→</i></a>
                <a className="tlink team-link" href="https://robtechworld.com/our-team/">Meet the team →</a>
              </div>
            </div>
          </div>
        </section>

        <section className="services" id="services" data-bg="#ffffff" data-fg="#000000">
          <div className="wrap">
            <Eyebrow>Our services</Eyebrow>
            <h2 className="split services-heading">Data-driven services to boost your revenue.</h2>
            <div className="sv">
              <ul className="tabs" role="tablist" aria-label="Our services">
                {services.map((service, index) => (
                  <li key={service.slug}>
                    <button
                      ref={(element) => { tabsRef.current[index] = element; }}
                      id={`service-tab-${index}`}
                      type="button"
                      role="tab"
                      aria-selected={activeService === index}
                      aria-controls="panel"
                      tabIndex={activeService === index ? 0 : -1}
                      onClick={() => chooseService(index)}
                      onPointerEnter={() => chooseService(index)}
                      onFocus={() => chooseService(index)}
                      onKeyDown={(event) => handleTabKeyDown(event, index)}
                    >
                      <span>0{index + 1}</span>{service.name}
                    </button>
                  </li>
                ))}
              </ul>
              <ServicePanel index={activeService} panelRef={panelRef} />
            </div>
          </div>
        </section>

        <section className="why" id="why" data-bg="#000000" data-fg="#ffffff">
          <div className="wrap why-grid">
            <div className="sticky">
              <Eyebrow>Why Rob Tech World</Eyebrow>
              <h2 className="split">Not your average digital agency.</h2>
              <p className="muted why-lead rv">Innovative strategies. Real growth. Measurable results.</p>
              <a className="btn btn-red why-cta rv" href="https://robtechworld.com/contact-us/">Get Free Consultation <i>→</i></a>
            </div>
            <div id="why-rows">
              <div className="row"><div className="n">01</div><div><h3>Strategy that works</h3><p>We analyze your business, audience and competitors to create a data-driven strategy that aligns with your goals and market demand.</p></div></div>
              <div className="row"><div className="n">02</div><div><h3>AI-powered execution</h3><p>Advanced tools, automation and AI-driven insights help us optimize campaigns, improve targeting and maximize performance across channels.</p></div></div>
              <div className="row"><div className="n">03</div><div><h3>High-converting design</h3><p>Websites crafted with user experience and conversions in mind, guiding every visitor through a clear journey that builds trust and drives action.</p></div></div>
              <div className="row"><div className="n">04</div><div><h3>Multi-channel marketing</h3><p>From SEO and paid ads to social media marketing, a unified approach that drives traffic, engagement and consistent growth.</p></div></div>
              <div className="row"><div className="n">05</div><div><h3>Transparent reporting</h3><p>Clear reports and insights, so you always know what’s working, what’s improving and how your business is growing.</p></div></div>
            </div>
          </div>
        </section>

        <section className="work" id="work" data-bg="#ffffff" data-fg="#000000">
          <div className="pin">
            <div className="wrap work-head">
              <div><Eyebrow>Case studies &amp; success stories</Eyebrow><h2 className="split">Proven results for real brands.</h2></div>
              <a className="btn btn-blue" href="https://robtechworld.com/case-studies/">View all work <i>→</i></a>
            </div>
            <div className="track" id="track">
              {caseStudies.map((item) => (
                <article className="card" key={item.name}>
                  <div className="vis"><span>{item.category}</span><div className="mock-window" aria-hidden="true"><s /><s /><s /></div><b>{item.name}</b></div>
                  <div className="info"><div className="tag">{item.label}</div><h3>{item.title}</h3><p>{item.description}</p><a className="tlink" href={item.href}>{item.link}</a></div>
                </article>
              ))}
            </div>
            <div className="progress-track"><i id="prog" /></div>
          </div>
        </section>

        <section className="results" id="results" data-bg="#f3f6fb" data-fg="#000000">
          <div className="wrap">
            <Eyebrow>Company highlights</Eyebrow>
            <h2 className="split results-heading">Numbers that reflect the work.</h2>
            <div className="stats">
              <div className="stat"><b><span data-count="7">7</span><sup>+</sup></b><span>Years of experience</span></div>
              <div className="stat"><b><span data-count="400">400</span><sup>+</sup></b><span>Projects completed</span></div>
              <div className="stat"><b><span data-count="20">20</span><sup>+</sup></b><span>Skilled professionals</span></div>
              <div className="stat"><b><span data-count="4.9" data-dec="1">4.9</span></b><span>Google rating · 132 reviews</span></div>
            </div>
            <div className="strip">
              <a href="https://clutch.co/profile/rob-tech-world">Clutch · 5.0</a>
              <a href="https://www.trustpilot.com/review/robtechworld.com">Trustpilot · 4.3</a>
              <a href="https://www.linkedin.com/company/rob-tech-world-designing-development-marketing/">LinkedIn · 5.0</a>
            </div>
          </div>
        </section>

        <section className="process" id="process" data-bg="#ffffff" data-fg="#000000">
          <div className="wrap process-grid">
            <div className="process-sticky"><Eyebrow>How we work</Eyebrow><h2 className="split">From first call to ongoing growth.</h2></div>
            <div className="steps" id="steps">
              <div className="fill" id="fill" />
              <div className="step" data-n="1"><h3>Understand</h3><p>We learn your business, audience, goals and competitors before anything is designed or built.</p></div>
              <div className="step" data-n="2"><h3>Plan &amp; quote</h3><p>We define requirements, key milestones and the delivery schedule, then give you a clear quote based on the actual scope of work.</p></div>
              <div className="step" data-n="3"><h3>Design</h3><p>Custom layouts with clear navigation and responsive screens for desktop, tablet and mobile — tuned to your brand.</p></div>
              <div className="step" data-n="4"><h3>Build</h3><p>Fast, secure, SEO-friendly development with attention to performance, mobile responsiveness and easy content management.</p></div>
              <div className="step" data-n="5"><h3>Launch &amp; grow</h3><p>After launch, our SEO and marketing teams build visibility and leads, with transparent reporting and ongoing website support.</p></div>
            </div>
          </div>
        </section>

        <section className="testi" id="testimonials" data-bg="#f3f6fb" data-fg="#000000">
          <div className="wrap testimonials-grid">
            <div className="testimonials-lead">
              <Eyebrow>Client reviews</Eyebrow>
              <h2 className="split">What our clients say about working with us.</h2>
              <div className="rate rv"><b>4.9</b><div><span className="stars">★★★★★</span><small>Based on 132 Google reviews</small></div></div>
              <a className="tlink review-link rv" href="https://clutch.co/profile/rob-tech-world">Also reviewed on Clutch →</a>
            </div>
            <div className="tgrid">
              {reviews.map((review) => (
                <figure className="quote-card" key={review.name}>
                  <div className="stars" aria-label="5 stars">★★★★★</div>
                  <blockquote>{review.quote}</blockquote>
                  <figcaption><span className="avatar">{review.initial}</span><cite>{review.name}<small>Google review</small></cite></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="cta" id="contact" data-bg="#ffffff" data-fg="#000000">
          <div className="wrap">
            <div className="cta-box">
              <div className="cta-copy">
                <Eyebrow>Ready to grow your business online?</Eyebrow>
                <h2 className="split">Let’s build your <span className="hl">next big thing.</span></h2>
                <p className="rv">Expert web design, SEO and digital marketing to drive more traffic and generate quality leads.</p>
              </div>
              <div className="ctas rv">
                <a className="btn btn-white" href="https://robtechworld.com/contact-us/">Get a Free Consultation <i>→</i></a>
                <a className="btn btn-line" href="https://api.whatsapp.com/send?phone=919816143435">WhatsApp us</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer data-bg="#f3f6fb" data-fg="#000000">
        <div className="wrap">
          <div className="ftop">
            <Logo footer />
            <div className="ctas">
              <a className="btn btn-red" href="https://robtechworld.com/contact-us/">Get Free Consultation <i>→</i></a>
              <a className="btn btn-blue" href="tel:+919816143435">Call Us</a>
            </div>
          </div>
          <div className="footer-grid">
            <div>
              <h4>About</h4>
              <p>As the CEO of Rob Tech World, my team and I are committed to helping businesses grow with innovative and result-driven SEO and digital marketing strategies.</p>
              <div className="social-links">
                <a href="https://www.facebook.com/robtechworld">Facebook</a>
                <a href="https://www.instagram.com/rob_tech_world">Instagram</a>
                <a href="https://www.linkedin.com/company/rob-tech-world-designing-development-marketing/">LinkedIn</a>
                <a href="https://www.youtube.com/@robtechworld">YouTube</a>
                <a href="https://api.whatsapp.com/send?phone=919816143435">WhatsApp</a>
              </div>
            </div>
            <div><h4>Company</h4><ul>
              <li><a href="https://robtechworld.com/about-us/">About Us</a></li><li><a href="https://robtechworld.com/our-team/">Our Team</a></li><li><a href="https://robtechworld.com/success-stories/">Success Stories</a></li><li><a href="https://robtechworld.com/case-studies/">Case Studies</a></li><li><a href="https://robtechworld.com/faqs/">FAQs</a></li><li><a href="https://robtechworld.com/blogs/">Blogs</a></li>
            </ul></div>
            <div><h4>Services</h4><ul>
              <li><a href="https://robtechworld.com/seo-services/">SEO Services</a></li><li><a href="https://robtechworld.com/ppc-services/">PPC Services</a></li><li><a href="https://robtechworld.com/lead-generations/">Lead Generations</a></li><li><a href="https://robtechworld.com/website-design/">Website Design</a></li><li><a href="https://robtechworld.com/website-development/">Website Development</a></li><li><a href="https://robtechworld.com/graphic-design/">Graphic Designing</a></li>
            </ul></div>
            <div><h4>White label</h4><ul>
              <li><a href="https://robtechworld.com/white-label-seo-services/">White Label SEO</a></li><li><a href="https://robtechworld.com/white-label-digital-marketing/">White Label Digital Marketing</a></li><li><a href="https://robtechworld.com/white-label-ppc/">White Label PPC</a></li><li><a href="https://robtechworld.com/white-label-facebook-ads/">White Label Facebook Ads</a></li><li><a href="https://robtechworld.com/white-label-social-media-marketing/">White Label Social Media</a></li><li><a href="https://robtechworld.com/white-label-link-building-services/">White Label Link Building</a></li>
            </ul></div>
            <div><h4>Contact</h4><ul>
              <li><a href="tel:+919816143435">+91 98161-43435</a></li><li><a href="tel:+917876715398">+91-7876715398</a></li><li><a href="mailto:robin@robtechworld.com">robin@robtechworld.com</a></li><li><a href="https://robtechworld.com/contact-us/">Contact Us</a></li>
            </ul></div>
          </div>
          <div className="offices">
            <div><b>India HQ</b><span>Unit Number 325, 3rd Floor, Global Business Park, Zirakpur, Punjab 140603</span></div>
            <div><b>USA</b><span>#3355 Hewitt Ave, Aspen Hill, MD 20906, United States</span></div>
            <div><b>Canada</b><span>26 Finch Cres, London, ON N6E 2E5, Canada</span></div>
          </div>
          <div className="footer-bottom"><span>© 2026 Rob Tech World. All rights reserved.</span><a href="#top">Back to top ↑</a></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
