# Peso Latam - Sistema de Referidos

Sistema web para gestión de referidos que permite a los usuarios invitar amigos y ganar recompensas por cada referido confirmado. Desarrollado con Next.js 16, React 19, TypeScript y Tailwind CSS.

## Descripción del Proyecto

Esta aplicación permite gestionar un programa de referidos donde los usuarios pueden:

- **Ver el listado de referidos**: Visualizar todos los referidos invitados con paginación (12 por página)
- **Invitar nuevos referidos**: Completar un formulario con validación para invitar personas por email y teléfono
- **Compartir link de referido**: Generar y compartir un enlace único de referido a través de redes sociales
- **Ver detalles de referidos**: Acceder a la información completa de cada referido individual
- **Monitorear ganancias**: Visualizar el total ganado basado en referidos confirmados

El proyecto sigue principios de arquitectura limpia con separación de features, manejo robusto de errores, estados de carga, y una interfaz responsive optimizada para móviles y desktop.

## Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, TypeScript, Tailwind CSS v4
- **Estado**: Zustand para estado global, React Query para estado del servidor
- **Validación**: Zod + React Hook Form
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint

## Estructura del Proyecto

```
├── app/                    # Rutas de Next.js App Router
│   ├── page.tsx           # Página principal (listado de referidos)
│   ├── add-referral/      # Página de invitación
│   └── referrals/[id]/    # Página de detalle de referido
├── features/              # Features organizados por dominio
│   ├── layout/           # Componentes de layout (Header, Sidebar)
│   └── referrals/        # Feature completa de referidos
│       ├── components/   # Componentes React
│       ├── hooks/        # Custom hooks
│       ├── services/     # Lógica de negocio y llamadas API
│       ├── store/        # Estado global (Zustand)
│       ├── types/        # TypeScript types
│       └── schemas/      # Esquemas de validación Zod
└── lib/                  # Utilidades compartidas
    ├── api/              # Cliente API con retry logic
    ├── components/       # Componentes compartidos
    └── utils/            # Utilidades y helpers
```

## Cumplimiento de Requerimientos del Challenge

Según el documento del [Frontend Challenge](https://peso-bo.notion.site/Frontend-challenge-2b8a0dbd705880fd818ac5b5993ffd50), este proyecto cumple con los siguientes requerimientos:

### 1. **Gestión de Referidos (CRUD)**

✅ **Implementado**: 
- **Crear referidos**: Formulario completo con validación en `/add-referral` que permite crear referidos con nombre, email y teléfono
- **Leer referidos**: 
  - Listado paginado en la página principal con 12 referidos por página
  - Vista detallada individual en `/referrals/[id]` con toda la información del referido
  - API service con métodos `getReferrals()`, `getAllReferrals()` y `getReferralById()`
- **Eliminar**: Preparado en la estructura del servicio (no requerido en el challenge)

**Archivos relevantes**:
- `features/referrals/services/referralService.ts` - Lógica de negocio
- `features/referrals/components/ReferralList/` - Componentes de listado
- `features/referrals/components/ReferralInvite/ReferralForm.tsx` - Formulario de creación
- `features/referrals/components/ReferralProfile/ReferralProfile.tsx` - Vista de detalle

### 2. **Paginación**

✅ **Implementado**: 
- Sistema de paginación en el listado de referidos con control de página actual
- Navegación con botones "Anterior" y "Siguiente"
- Indicador visual de página actual y total de páginas
- 12 referidos por página (configurable en `REFERRALS_BY_PAGE`)
- Estado de paginación gestionado con Zustand en `referralStore`

**Archivos relevantes**:
- `features/referrals/components/ReferralList/ReferralList.tsx`
- `features/referrals/store/referralStore.ts`
- `features/referrals/consts/referralConsts.ts`

### 3. **Validación de Formularios**

✅ **Implementado**: 
- Validación robusta usando **Zod** para esquemas de validación
- Integración con **React Hook Form** para manejo de formularios
- Validación en tiempo real con mensajes de error claros
- Campos validados:
  - Nombre: requerido
  - Email: formato válido de email
  - Teléfono: requerido
- Manejo de errores del servidor con mensajes específicos

**Archivos relevantes**:
- `features/referrals/schemas/referral.schema.ts` - Esquemas Zod
- `features/referrals/components/ReferralInvite/ReferralForm.tsx` - Implementación del formulario

### 4. **Manejo de Errores Robusto**

✅ **Implementado**: 
- Sistema completo de manejo de errores con clases personalizadas:
  - `NetworkError`: Errores de conexión
  - `ApiError`: Errores HTTP con códigos de estado
  - `ValidationError`: Errores de validación
- Retry logic automático (3 intentos) en el cliente API
- Mensajes de error contextuales y amigables al usuario
- Componentes de error dedicados (`ReferralListError`, `ReferralProfileError`, `TotalEarnedBannerError`)
- Panel de simulación de errores para testing (ErrorSimulationPanel)
- Manejo de códigos de estado HTTP: 400, 401, 403, 404, 500, 502, 503

**Archivos relevantes**:
- `lib/api/client.ts` - Cliente API con retry logic
- `lib/utils/errorMessages.ts` - Utilidades de mensajes de error
- `features/referrals/components/*/Error.tsx` - Componentes de error
- `lib/components/ErrorSimulationPanel.tsx` - Panel de simulación

### 5. **Estados de Carga (Loading States)**

✅ **Implementado**: 
- Componentes de carga dedicados para cada feature:
  - `ReferralListLoading` - Skeleton para listado
  - `ReferralProfileLoading` - Skeleton para perfil
  - `TotalEarnedBannerLoading` - Skeleton para banner
- Indicadores visuales durante operaciones asíncronas
- Estados de "disabled" en botones durante operaciones
- React Query gestiona automáticamente estados de loading, error y success

**Archivos relevantes**:
- `features/referrals/components/*/Loading.tsx` - Componentes de carga
- Hooks personalizados que exponen estados `isLoading`, `isError`, `isSuccess`

### 6. **Diseño Responsive y UI/UX**

✅ **Implementado**: 
- Diseño completamente responsive con Tailwind CSS
- Sidebar colapsable en móviles con overlay
- Header adaptativo con menú móvil
- Grid responsive para tarjetas de referidos (1 columna móvil, 2-3 desktop)
- Navegación intuitiva con estado activo visual
- Paleta de colores consistente (Primary: `#082422`, Accent: `#ffdb3a`)
- Estados hover y active en todos los botones
- Transiciones suaves en interacciones

**Archivos relevantes**:
- `features/layout/components/Sidebar.tsx` - Sidebar responsive
- `features/layout/components/Header.tsx` - Header con menú móvil
- `features/referrals/components/ReferralList/ReferralList.tsx` - Grid responsive
- `app/globals.css` - Variables CSS y estilos globales

### 7. **Testing**

✅ **Implementado**: 
- Suite de tests con Jest y React Testing Library
- Tests de componentes críticos:
  - `ReferralForm.test.tsx` - Formulario de invitación
  - `ReferralList.test.tsx` - Listado de referidos
  - `ReferralCard.test.tsx` - Tarjeta de referido
  - `ReferralProfile.test.tsx` - Perfil de referido
  - `ReferralListError.test.tsx` - Manejo de errores
- Tests de utilidades:
  - `formatCurrency.test.ts` - Formateo de moneda
- Configuración de Jest con jsdom para testing de componentes

**Archivos relevantes**:
- `jest.config.js` - Configuración de Jest
- `jest.setup.js` - Setup de testing library
- `features/**/__tests__/*.test.tsx` - Tests de componentes

### 8. **Arquitectura y Buenas Prácticas**

✅ **Implementado**: 
- **Feature-based architecture**: Código organizado por features/dominios
- **Separación de responsabilidades**: Services, hooks, components, stores bien separados
- **TypeScript**: Tipado fuerte en toda la aplicación
- **Custom hooks**: `useReferrals`, `useCreateReferral` para lógica reutilizable
- **React Query**: Manejo eficiente de estado del servidor con cache y refetch
- **Zustand**: Estado global ligero y eficiente
- **Constantes centralizadas**: Valores configurables en archivos de consts
- **Código limpio**: Sin comentarios innecesarios, nombres descriptivos
- **ESLint**: Linting configurado y sin errores

### 9. **API Integration**

✅ **Implementado**: 
- Cliente API centralizado con retry logic
- Integración con MockAPI (`https://692a255d7615a15ff24bfe3a.mockapi.io`)
- Endpoints implementados:
  - `GET /referrals` - Listado de referidos
  - `GET /referrals/:id` - Detalle de referido
  - `POST /referrals` - Crear referido
- Manejo de errores HTTP con códigos de estado específicos
- Headers y configuración estándar de fetch

**Archivos relevantes**:
- `lib/api/client.ts` - Cliente API
- `features/referrals/services/referralService.ts` - Servicios de negocio

### 10. **Funcionalidades Adicionales**

✅ **Implementado**: 
- **Link de referido compartible**: Generación automática de links únicos
- **Compartir en redes sociales**: Integración con Facebook, Twitter, WhatsApp, LinkedIn
- **Copiar al portapapeles**: Funcionalidad para copiar link de referido
- **Banner de ganancias totales**: Visualización de total ganado y estadísticas
- **Formateo de moneda**: Utilidad para formatear valores monetarios
- **Simulación de errores**: Panel de desarrollo para probar diferentes escenarios de error

## Getting Started

### Instalación

```bash
# Instalar dependencias
yarn install

# O con npm
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
yarn dev

# O con npm
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts Disponibles

```bash
# Desarrollo
yarn dev

# Build para producción
yarn build

# Iniciar en producción
yarn start

# Linting
yarn lint

# Tests
yarn test

# Tests en modo watch
yarn test:watch
```

## Características Técnicas Destacadas

- **Next.js App Router**: Uso de la última versión con Server Components
- **React Query**: Cache inteligente, refetch automático, y gestión de estados
- **Retry Logic**: Reintentos automáticos en caso de fallos de red
- **Error Boundaries**: Manejo de errores a nivel de componente
- **Type Safety**: TypeScript en todo el proyecto con tipos bien definidos
- **Performance**: Optimizaciones con React Query (staleTime, cache)
- **Accessibility**: HTML semántico y estructura accesible

## Próximas Mejoras

- [ ] Implementar actualización de referidos
- [ ] Implementar eliminación de referidos
- [ ] Añadir filtros y búsqueda
- [ ] Implementar autenticación real
- [ ] Añadir más tests de integración
- [ ] Implementar modo oscuro
- [ ] Añadir animaciones y micro-interacciones

---

Desarrollado con ❤️ para Peso Latam
