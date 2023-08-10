interface PersonalitySelectProps {
  personalities: string[]
  selectedPersonality: string
  onPersonalityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const PersonalitySelect: React.FC<PersonalitySelectProps> = ({
  personalities,
  selectedPersonality,
  onPersonalityChange,
}) => {
  return (
    <select
      name="personality"
      id="personality"
      value={selectedPersonality}
      onChange={onPersonalityChange}
      className=" flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
    >
      <option value="">Select Personality</option>
      {personalities.map((personality, index) => (
        <option key={index} value={personality}>
          {personality}
        </option>
      ))}
    </select>
  )
}

export default PersonalitySelect
