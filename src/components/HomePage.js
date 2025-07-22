import React from 'react';

const HomePage = ({ onNavigate = () => {} }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Energía Renovable para un Futuro Sostenible
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          En EnerSecure S.A.S., te ofrecemos soluciones innovadoras en energía solar y eólica para potenciar tu negocio y contribuir al planeta.
        </p>
        <button
          onClick={() => onNavigate('login')}
          className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
        >
          Iniciar Sesión
        </button>
      </section>

      <section className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Paneles Solares</h2>
          <p className="text-gray-700 text-lg">
            Maximiza tu producción energética con nuestros paneles solares de última generación. Diseñados para eficiencia y durabilidad.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Turbinas Eólicas</h2>
          <p className="text-gray-700 text-lg">
            Aprovecha la fuerza del viento con nuestras turbinas eólicas, ideales para generar energía limpia a gran escala.
          </p>
        </div>
      </section>

      <section className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">¿Por qué elegir EnerSecure S.A.S.?</h2>
        <ul className="text-xl text-gray-700 space-y-4">
          <li>Tecnología de vanguardia y alta eficiencia.</li>
          <li>Soporte técnico especializado y mantenimiento preventivo.</li>
          <li>Compromiso con el medio ambiente y la sostenibilidad.</li>
          <li>Soluciones personalizadas para cada necesidad.</li>
        </ul>
      </section>

      <section className="max-w-4xl mx-auto w-full p-4">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Preguntas Frecuentes</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">¿Cómo funciona el alquiler de paneles solares?</h3>
            <p className="text-gray-700">
              Ofrecemos un modelo de alquiler donde instalamos y mantenemos los paneles solares en tu propiedad. Tú solo te encargas de distribuir la energía generada a tus nodos.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">¿Qué tipo de mantenimiento ofrecen?</h3>
            <p className="text-gray-700">
              Realizamos mantenimiento preventivo y correctivo. Nuestro equipo técnico se encarga de asegurar el óptimo funcionamiento de los equipos.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">¿Puedo monitorear la producción de mi equipo?</h3>
            <p className="text-gray-700">
              Sí, a través de nuestro panel de usuario, podrás ver en tiempo real la producción de tu panel solar o turbina eólica, así como el historial de mantenimiento y la ubicación.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">¿Qué pasa si hay una falla en el equipo?</h3>
            <p className="text-gray-700">
              Nuestro equipo de soporte técnico está disponible para atender cualquier falla. Nos encargamos de la reparación o reemplazo del equipo sin costo adicional para ti.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;