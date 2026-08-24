export type ScreenId =
  | 'home-desktop'
  | 'home-movil'
  | 'servicios-desktop'
  | 'servicios-contabilidad'
  | 'servicios-legal'
  | 'servicios-tramites'
  | 'servicios-eventos'
  | 'nosotros-desktop'
  | 'casos-desktop'
  | 'blog'
  | 'blog-articulo'
  | 'admin';

export interface NavigationProps {
  currentScreen: ScreenId;
  /**
   * `parametro` solo lo usa `blog-articulo`, que es la única ruta con una
   * parte variable (`/blog/{slug}`).
   */
  onNavigate: (
    target: ScreenId,
    transitionType?: 'push' | 'push_back',
    parametro?: string,
  ) => void;
  openDiagnosticModal: () => void;
  /** Slug del artículo cuando la pantalla activa es `blog-articulo`. */
  parametro?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  features?: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  sector: string;
}
