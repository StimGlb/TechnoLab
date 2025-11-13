// features/Robotique/RobotiqueHub.tsx
export function RobotiqueHub() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <ActivityCard 
        title="mBot2 - Débutant"
        description="Premier programme : avancer/reculer"
        onClick={() => /* navigation */}
      />
      <ActivityCard 
        title="mBot2 - Capteurs"
        description="Utiliser les capteurs ultrason et ligne"
      />
      {/* ... autres activités */}
    </div>
  )
}
