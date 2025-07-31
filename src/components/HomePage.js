import React from 'react';

const HomePage = ({ onNavigate = () => {} }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
          Energía Renovable para un{' '}
          <span className="text-yellow-400">Futuro Sostenible</span>
        </h1>
        
        {/* Logo de la empresa */}
        <div className="mb-8 flex justify-center">
          <img 
            src="/logo_enersecure.png" 
            alt="EnerSecure S.A.S. Logo" 
            className="w-48 h-48 object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          En <span className="text-green-400 font-semibold">EnerSecure S.A.S.</span>, te ofrecemos soluciones innovadoras en energía solar y eólica para potenciar tu negocio y contribuir al planeta.
        </p>
        <button
          onClick={() => onNavigate('login')}
          className="bg-gradient-to-r from-green-500 to-yellow-500 text-black px-8 py-3 rounded-lg text-lg font-bold shadow-lg hover:from-green-400 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105"
        >
          Iniciar Sesión
        </button>
      </section>

      <section className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
        <div className="bg-gray-900 border border-green-500 p-8 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4 flex items-center">
            <span className="mr-3">☀️</span>
            Paneles Solares
          </h2>
          <p className="text-gray-300 text-lg">
            Maximiza tu producción energética con nuestros paneles solares de última generación. Diseñados para eficiencia y durabilidad.
          </p>
          <div className="mt-4">
            <span className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
              Alta Eficiencia
            </span>
          </div>
        </div>
        <div className="bg-gray-900 border border-yellow-500 p-8 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300">
          <h2 className="text-3xl font-bold text-green-400 mb-4 flex items-center">
            <span className="mr-3">💨</span>
            Turbinas Eólicas
          </h2>
          <p className="text-gray-300 text-lg">
            Aprovecha la fuerza del viento con nuestras turbinas eólicas, ideales para generar energía limpia a gran escala.
          </p>
          <div className="mt-4">
            <span className="inline-block bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
              Energía Limpia
            </span>
          </div>
        </div>
      </section>

      <section className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="text-4xl font-bold text-white mb-6">
          ¿Por qué elegir <span className="text-green-400">EnerSecure</span> 
          <span className="text-yellow-400"> S.A.S.</span>?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 border border-green-400/30 p-6 rounded-xl">
            <div className="text-green-400 text-3xl mb-3">⚡</div>
            <h3 className="text-green-400 font-semibold mb-2">Tecnología Avanzada</h3>
            <p className="text-gray-300">Tecnología de vanguardia y alta eficiencia.</p>
          </div>
          <div className="bg-gray-900/50 border border-yellow-400/30 p-6 rounded-xl">
            <div className="text-yellow-400 text-3xl mb-3">🔧</div>
            <h3 className="text-yellow-400 font-semibold mb-2">Soporte Especializado</h3>
            <p className="text-gray-300">Soporte técnico especializado y mantenimiento preventivo.</p>
          </div>
          <div className="bg-gray-900/50 border border-green-400/30 p-6 rounded-xl">
            <div className="text-green-400 text-3xl mb-3">🌱</div>
            <h3 className="text-green-400 font-semibold mb-2">Eco-Sostenible</h3>
            <p className="text-gray-300">Compromiso con el medio ambiente y la sostenibilidad.</p>
          </div>
          <div className="bg-gray-900/50 border border-yellow-400/30 p-6 rounded-xl">
            <div className="text-yellow-400 text-3xl mb-3">🎯</div>
            <h3 className="text-yellow-400 font-semibold mb-2">Soluciones Personalizadas</h3>
            <p className="text-gray-300">Soluciones personalizadas para cada necesidad.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto w-full p-4">
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          <span className="text-yellow-400">Preguntas</span> Frecuentes
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-900 border-l-4 border-green-500 p-6 rounded-xl shadow-md hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
            <h3 className="text-xl font-semibold text-green-400 mb-2 flex items-center">
              <span className="mr-2">💡</span>
              ¿Cómo funciona el alquiler de paneles solares?
            </h3>
            <p className="text-gray-300">
              Ofrecemos un modelo de alquiler donde instalamos y mantenemos los paneles solares en tu propiedad. Tú solo te encargas de distribuir la energía generada a tus nodos.
            </p>
          </div>
          <div className="bg-gray-900 border-l-4 border-yellow-500 p-6 rounded-xl shadow-md hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2 flex items-center">
              <span className="mr-2">🛠️</span>
              ¿Qué tipo de mantenimiento ofrecen?
            </h3>
            <p className="text-gray-300">
              Realizamos mantenimiento preventivo y correctivo. Nuestro equipo técnico se encarga de asegurar el óptimo funcionamiento de los equipos.
            </p>
          </div>
          <div className="bg-gray-900 border-l-4 border-green-500 p-6 rounded-xl shadow-md hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
            <h3 className="text-xl font-semibold text-green-400 mb-2 flex items-center">
              <span className="mr-2">📊</span>
              ¿Puedo monitorear la producción de mi equipo?
            </h3>
            <p className="text-gray-300">
              Sí, a través de nuestro <span className="text-yellow-400 font-medium">panel de usuario</span>, podrás ver en tiempo real la producción de tu panel solar o turbina eólica, así como el historial de mantenimiento y la ubicación.
            </p>
          </div>
          <div className="bg-gray-900 border-l-4 border-yellow-500 p-6 rounded-xl shadow-md hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2 flex items-center">
              <span className="mr-2">🔧</span>
              ¿Qué pasa si hay una falla en el equipo?
            </h3>
            <p className="text-gray-300">
              Nuestro equipo de <span className="text-green-400 font-medium">soporte técnico</span> está disponible para atender cualquier falla. Nos encargamos de la reparación o reemplazo del equipo sin costo adicional para ti.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;