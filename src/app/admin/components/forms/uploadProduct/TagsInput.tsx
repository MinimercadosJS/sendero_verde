import { subcategories, tags } from "@/utils/consts";
import { Category } from "@/model/product";
import { KeyboardEventHandler } from "react";
import { MdCancel } from "react-icons/md";

interface Props {
  value?: string[];
  name: string;
  onChange: (value: string[]) => void;
  onBlur?: () => void;
  category: Category;
  disabled?: boolean;
}

const TagsInput = ({ value = [], category = "otra", onChange }: Props) => {
  const handleClickEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key != "Enter") return;
    e.preventDefault();
    const newTag = e.currentTarget.value.trim().toLowerCase();
    onChange([...value, newTag.trim().toLowerCase()]);
    e.currentTarget.value = "";
  };

  const handleRemove = (index: number) => {
    const newTags = [...value];
    newTags.splice(newTags.indexOf(value[index]), 1);
    onChange(newTags);
  };

  return (
    <div>
      <label className="flex justify-between">
        <span className="text-sm font-semibold text-gray-600">Etiquetas</span>
        <input
          type="text"
          className="decoration-transparent outline-hidden w-24"
          onKeyDown={handleClickEnter}
          placeholder="add tag"
          list="tags"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {value.map((tag, index) => (
          <Tag title={tag} key={index} index={index} remove={handleRemove} />
        ))}
        <datalist id="tags">
          {tags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
          {subcategories[category]?.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </datalist>
      </div>
    </div>
  );
};

const Tag = ({
  title,
  remove,
  index,
}: {
  title: string;
  index: number;
  remove: (index: number) => void;
}) => {
  return (
    <span
      onClick={() => remove(index)}
      className="flex items-center bg-blue-100 px-2 rounded-full gap-1"
    >
      {title}
      <MdCancel />
    </span>
  );
};
export default TagsInput;
