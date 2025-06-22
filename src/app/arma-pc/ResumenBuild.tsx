export default function ResumenBuild({ build }: { build: any }) {
    const componentes = Object.values(build);
    const total = componentes.reduce((acc: number, p: any) => acc + Number(p?.price || 0), 0) as number;


    if (componentes.length === 0) return null;

    return (
        <div className="mt-8 p-4 border-t border-white/30">
            <h2 className="text-2xl font-semibold mb-4">Resumen del armado</h2>
            <ul className="space-y-1 text-sm">
                {Object.entries(build).map(([tipo, prod]: any) => (
                <li key={tipo}>
                    <strong className="capitalize">{tipo.replace("_", " ")}:</strong> {prod.name} — ${prod.price}
                </li>
                ))}
            </ul>
            <p className="mt-4 text-lg font-bold">Total: ${total}</p>
        </div>
    );
}
