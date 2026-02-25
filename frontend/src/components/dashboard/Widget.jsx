import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import TasksWidget from "./TasksWidget";

const Widget = ({ id, title }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="bg-white shadow-lg rounded-xl p-6"
    >
      <div {...attributes} {...listeners} className="cursor-grab">
        <h3 className="font-bold mb-3">{title}</h3>
      </div>

      {title === "Tasks" ? (
        <TasksWidget />
      ) : (
        <p className="text-gray-500">
          Widget content coming soon...
        </p>
      )}
    </motion.div>
  );
};

export default Widget;