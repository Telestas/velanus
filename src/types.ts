export type ScreenId =
  | 'home-desktop'
  | 'home-movil'
  | 'servicios-desktop'
  | 'servicios-contabilidad'
  | 'servicios-legal'
  | 'servicios-tramites'
  | 'servicios-eventos'
  | 'nosotros-desktop'
  | 'blog'
  | 'blog-articulo'
  | 'aviso-legal'
  | 'privacidad'
  | 'descargo'
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
