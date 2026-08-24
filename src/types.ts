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
  | 'admin';

export interface NavigationProps {
  currentScreen: ScreenId;
  onNavigate: (target: ScreenId, transitionType?: 'push' | 'push_back') => void;
  openDiagnosticModal: () => void;
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
