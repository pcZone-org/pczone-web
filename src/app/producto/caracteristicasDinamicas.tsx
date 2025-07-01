const atributosPorComponente: Record<string, { label: string; key: string }[]> = {
    cpus: [
        { label: 'Grafica', key: 'graphics' },
        { label: 'Cant. de Nucleos', key: 'core_count' },
        { label: 'Reloj de nucleos', key: 'core_clock' },
        { label: 'Frecuencia de Reloj', key: 'boost_clock' },
        { label: 'Potencia de Diseño Térmico (TDP)', key: 'tdp' },
        { label: 'Tecnología de Montaje Superficial (STM)', key: 'smt' },
    ],
    gabinetes: [
        { label: 'Tipo', key: 'type' },
        { label: 'Color', key: 'color' },
        { label: 'Unidad de Fuente de Alimentación (PSU)', key: 'psu' },
        { label: 'Panel Lateral', key: 'side_panel' },
        { label: 'Volumen Externo', key: 'external_volume' },
    ],
    mothers: [
        { label: 'Socket', key: 'socket' },
        { label: 'Factor de forma', key: 'form_factor' },
        { label: 'Cant. de Memorias', key: 'memory_slots' },
        { label: 'Memoria Máx.', key: 'max_memory' },
        { label: 'Color', key: 'color' },
    ],
    coolers: [
        { label: 'Revoluciones por minuto', key: 'rpm' },
        { label: 'Ruido', key: 'noise' },
        { label: 'Color', key: 'color' },
        { label: 'Tamaño', key: 'size' },
    ],
    fuentes:[
        { label: 'Tipo', key: 'type' }, 
        { label: 'Eficiencia', key: 'efficiency' }, 
        { label: 'Voltaje', key: 'wattage' }, 
        { label: 'Modular', key: 'modular' }, 
    ],
    graficas:[
        { label: 'Chipset', key: 'chipset' },
        { label: 'Memoria', key: 'memory' },
        { label: 'Reloj de Nucleo', key: 'core_clock' },
        { label: 'Frecuencia de Reloj', key: 'boost_clock' },
        { label: 'Color', key: 'color' },
        { label: 'Largo', key: 'length' },
    ],
    memorias_externas:[
        {label: 'Tipo', key: 'type' },
        {label: 'Interfase', key: 'interface' },
        {label: 'Capacidad (gb)', key: 'capacity' },
        {label: 'Color', key: 'color' },
    ],
    memorias_internas:[
        {label: 'Capacidad (gb)', key: 'capacity' },
        {label: 'Tipo', key: 'type' },
        {label: 'Cache', key: 'cache' },
        {label: 'Factor de forma', key: 'form_factor' },
        {label: 'Interfase', key: 'interface' },
    ],
    rams:[
        {label: 'Canales', key: 'speed_channels' },
        {label: 'Velicidad (Mhz)', key: 'speed_mhz' },
        {label: 'Calidad de modulo', key: 'modules_qty' },
        {label: 'Capacidad de modulo', key: 'module_capacity' },
        {label: 'Color', key: 'color' },
        {label: 'Tipo', key: 'first_word_latency' },
        {label: 'Latencia', key: 'cas_latency' },
    ],
    sounds:[
        {label: 'Canales', key: 'channels' },
        {label: 'Audio Digital', key: 'digital_audio' },
        {label: 'Relación señal-ruido (SNR)', key: 'snr' },
        {label: 'Rango Basico', key: 'sample_rate' },
        {label: 'Chipset', key: 'chipset' },
        {label: 'Interfase', key: 'interface' },
    ]

};

export default function CaracteristicasDinamicas({ producto, tipo }: { producto: any; tipo: string }) {
    const atributos = atributosPorComponente[tipo];

    if (!atributos) return null;

    return (
        <section className='grid grid-cols-2 gap-4 justify-center bg-[#102647] w-3/4 p-5 mb-6 rounded-xl'>
        <div>
            <h1 className='text-md border-b border-blue-500 mb-2'>CARACTERÍSTICAS</h1>
            {atributos.slice(0, Math.ceil(atributos.length / 2)).map(({ label, key }) => (
            <div className='flex flex-row gap-2 mb-1' key={key}>
                <span>{label}:</span>
                <span className='grow text-white'>{producto[key] || "—"}</span>
            </div>
            ))}
        </div>
        <div>
            <h1 className='text-md border-b border-blue-500 mb-2'>ESPECIFICACIONES</h1>
            {atributos.slice(Math.ceil(atributos.length / 2)).map(({ label, key }) => (
            <div className='flex flex-row gap-2 mb-1' key={key}>
                <span>{label}:</span>
                <span className='grow text-white'>{producto[key] || "—"}</span>
            </div>
            ))}
        </div>
        </section>
    );
}
