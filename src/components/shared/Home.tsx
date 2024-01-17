import React, { useState, useEffect } from 'react';

interface Skill {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: 'Tarun' },
    { id: 2, name: 'Biswamber' },
    { id: 3, name: 'Suva' },
    { id: 4, name: 'Anjali' },
  ]);

  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [showSkills, setShowSkills] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(skills);

  const handleInputClick = () => {
    setShowSkills(!showSkills);
  };

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkills([...selectedSkills, skill]);

    setSkills((prevSkills) => prevSkills.filter((s) => s.id !== skill.id));
  };

  const handleRemoveSkill = (skillId: number) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill.id !== skillId));
    const removedSkill = selectedSkills.find((skill) => skill.id === skillId);
    if (removedSkill) {
      setSkills([...skills, removedSkill]);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered = skills.filter((skill) =>
      skill.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSkills(filtered);
  };

  useEffect(() => {
    setFilteredSkills(skills);
  }, [skills]);

  useEffect(() => {
    if (!inputValue) {
      setFilteredSkills(skills);
    }
  }, [inputValue, skills]);

  return (
    <div className="w-full max-w-md mx-auto my-8">
      <div className="relative">
        <h1 className="text-center text-3xl font-semibold mb-4">Assignment</h1>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder="Find Skills"
          className="border border-gray-300 rounded p-2 w-full"
        />
        <div className="absolute top-0 right-0 mt-14 mr-2">
          {selectedSkills.map((skill) => (
            <span key={skill.id} className="mr-2 mt-1 inline-flex items-center">
              <span className="mr-1">{skill.name}</span>
              <button
                onClick={() => handleRemoveSkill(skill.id)}
                className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
              >
                X
              </button>
            </span>
          ))}
        </div>
      </div>
      {showSkills && (
        <ul className="mt-2">
          {filteredSkills.map((skill) => (
            <li
              key={skill.id}
              onClick={() => handleSkillClick(skill)}
              className="cursor-pointer hover:bg-gray-100 p-2"
            >
              {highlightMatchedText(skill.name, inputValue)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;

const highlightMatchedText = (text: string, query: string): React.ReactNode => {
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <span>
      {parts.map((part, index) => (
        <span key={index} style={part.toLowerCase() === query.toLowerCase() ? { color: 'blue' } : {}}>
          {part}
        </span>
      ))}
    </span>
  );
};
