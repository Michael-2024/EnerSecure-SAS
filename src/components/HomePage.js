import React from 'react';

const HomePage = ({ onNavigate = () => {} }) => {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-4 overflow-x-hidden" style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="text-center mb-8 sm:mb-12 w-full max-w-7xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 leading-tight px-2">
          Energía Renovable para un{' '}
          <span className="text-yellow-400">Futuro Sostenible</span>
        </h1>
        
        {/* Logo de la empresa */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <img 
            src="/logo_enersecure.png" 
            alt="EnerSecure S.A.S. Logo" 
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain hover:scale-105 transition-transform duration-300"
            style={{ maxWidth: '100%', height: 'auto' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
          En <span className="text-green-400 font-semibold">EnerSecure S.A.S.</span>, te ofrecemos soluciones innovadoras en energía solar y eólica para potenciar tu negocio y contribuir al planeta.
        </p>
        
        <button
          onClick={() => onNavigate('login')}
          className="bg-gradient-to-r from-green-500 to-yellow-500 text-black px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-bold shadow-lg hover:from-green-400 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 w-full max-w-xs mx-auto block"
        >
          Iniciar Sesión
        </button>
      </section>

      {/* Servicios Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto mb-8 sm:mb-12 w-full px-4">
        <div className="bg-gray-900/90 backdrop-blur-sm border border-green-500/30 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4 flex items-center flex-wrap">
            <span className="mr-3 text-2xl sm:text-3xl">☀️</span>
            <span>Paneles Solares</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Maximiza tu producción energética con nuestros paneles solares de última generación. Diseñados para eficiencia y durabilidad.
          </p>
          <div className="mt-4">
            <span className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
              Alta Eficiencia
            </span>
          </div>
        </div>
        
        <div className="bg-gray-900/90 backdrop-blur-sm border border-yellow-500/30 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-400 mb-4 flex items-center flex-wrap">
            <span className="mr-3 text-2xl sm:text-3xl">💨</span>
            <span>Turbinas Eólicas</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Aprovecha la fuerza del viento con nuestras turbinas eólicas, ideales para generar energía limpia a gran escala.
          </p>
          <div className="mt-4">
            <span className="inline-block bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
              Energía Limpia
            </span>
          </div>
        </div>
      </section>

      {/* Por qué elegir Section */}
      <section className="text-center max-w-6xl mx-auto mb-8 sm:mb-12 w-full px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          ¿Por qué elegir <span className="text-green-400">EnerSecure</span>{' '}
          <span className="text-yellow-400">S.A.S.</span>?
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-green-400/30 p-4 sm:p-6 rounded-xl hover:shadow-lg hover:shadow-green-400/10 transition-all duration-300">
            <div className="text-green-400 text-2xl sm:text-3xl mb-3">⚡</div>
            <h3 className="text-green-400 font-semibold mb-2 text-base sm:text-lg">Tecnología Avanzada</h3>
            <p className="text-gray-300 text-sm sm:text-base">Tecnología de vanguardia y alta eficiencia.</p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm border border-yellow-400/30 p-4 sm:p-6 rounded-xl hover:shadow-lg hover:shadow-yellow-400/10 transition-all duration-300">
            <div className="text-yellow-400 text-2xl sm:text-3xl mb-3">🔧</div>
            <h3 className="text-yellow-400 font-semibold mb-2 text-base sm:text-lg">Soporte Especializado</h3>
            <p className="text-gray-300 text-sm sm:text-base">Soporte técnico especializado y mantenimiento preventivo.</p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm border border-green-400/30 p-4 sm:p-6 rounded-xl hover:shadow-lg hover:shadow-green-400/10 transition-all duration-300">
            <div className="text-green-400 text-2xl sm:text-3xl mb-3">🌱</div>
            <h3 className="text-green-400 font-semibold mb-2 text-base sm:text-lg">Eco-Sostenible</h3>
            <p className="text-gray-300 text-sm sm:text-base">Compromiso con el medio ambiente y la sostenibilidad.</p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm border border-yellow-400/30 p-4 sm:p-6 rounded-xl hover:shadow-lg hover:shadow-yellow-400/10 transition-all duration-300">
            <div className="text-yellow-400 text-2xl sm:text-3xl mb-3">🎯</div>
            <h3 className="text-yellow-400 font-semibold mb-2 text-base sm:text-lg">Soluciones Personalizadas</h3>
            <p className="text-gray-300 text-sm sm:text-base">Soluciones personalizadas para cada necesidad.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto w-full p-4 mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-6 sm:mb-8 leading-tight">
          <span className="text-yellow-400">Preguntas</span> Frecuentes
        </h2>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-gray-900/90 backdrop-blur-sm border-l-4 border-green-500 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-green-400 mb-2 flex items-start">
              <span className="mr-2 text-xl sm:text-2xl flex-shrink-0">💡</span>
              <span>¿Cómo funciona el alquiler de paneles solares?</span>
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Ofrecemos un modelo de alquiler donde instalamos y mantenemos los paneles solares en tu propiedad. Tú solo te encargas de distribuir la energía generada a tus nodos.
            </p>
          </div>
          
          <div className="bg-gray-900/90 backdrop-blur-sm border-l-4 border-yellow-500 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-2 flex items-start">
              <span className="mr-2 text-xl sm:text-2xl flex-shrink-0">🛠️</span>
              <span>¿Qué tipo de mantenimiento ofrecen?</span>
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Realizamos mantenimiento preventivo y correctivo. Nuestro equipo técnico se encarga de asegurar el óptimo funcionamiento de los equipos.
            </p>
          </div>
          
          <div className="bg-gray-900/90 backdrop-blur-sm border-l-4 border-green-500 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-green-400 mb-2 flex items-start">
              <span className="mr-2 text-xl sm:text-2xl flex-shrink-0">📊</span>
              <span>¿Puedo monitorear la producción de mi equipo?</span>
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Sí, a través de nuestro <span className="text-yellow-400 font-medium">panel de usuario</span>, podrás ver en tiempo real la producción de tu panel solar o turbina eólica, así como el historial de mantenimiento y la ubicación.
            </p>
          </div>
          
          <div className="bg-gray-900/90 backdrop-blur-sm border-l-4 border-yellow-500 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-2 flex items-start">
              <span className="mr-2 text-xl sm:text-2xl flex-shrink-0">🔧</span>
              <span>¿Qué pasa si hay una falla en el equipo?</span>
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Nuestro equipo de <span className="text-green-400 font-medium">soporte técnico</span> está disponible para atender cualquier falla. Nos encargamos de la reparación o reemplazo del equipo sin costo adicional para ti.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;