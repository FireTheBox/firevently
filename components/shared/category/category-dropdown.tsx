import { startTransition, useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryType } from "@/lib/category/category.definition";

import { P } from "../../typography/p";
import { Input } from "../../ui/input";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

export const CategoryDropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    fetch("/api/category", {
      method: "POST",
      body: JSON.stringify({ name: newCategory.trim() }),
    })
      .then((response) => response.json())
      .then((category) => {
        setCategories((prevState) => [...prevState, category]);
      });
  };

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("/api/category");
      const categories = (await response.json()).categories;

      if (categories) {
        setCategories(categories as CategoryType[]);
      }
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder="Categoria" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              <P>{category.name}</P>
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger>
            <P className="px-2">Adicionar nova categoria</P>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Nova categoria</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Nome da Categoria"
                  className="mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Adicionar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};
