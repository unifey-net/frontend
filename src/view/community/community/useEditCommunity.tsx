import { useSelector } from "react-redux";

export default (id: number): boolean => {
    let editor = useSelector((state: any) => state.editor)

    return editor.isEditing && editor.id === id && editor.type === "community"
};