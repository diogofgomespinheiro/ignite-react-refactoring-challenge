import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { IFood } from '../../types';

const Dashboard = () => {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);

  useEffect(() => {
    async function getFood(): Promise<void> {
      const response = await api.get<IFood[]>('/foods');
      setFoods(response.data);
    }

    getFood();
  }, []);

  async function handleAddFood(food: IFood): Promise<void> {
    try {
      const response = await api.post<IFood>('/foods', {
        ...food,
        available: true
      });

      setFoods(prevState => [...prevState, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: IFood): Promise<void> {
    try {
      const { data: updatedFood } = await api.put<IFood>(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food
      });

      const updatedFoods = foods.map(f => (f.id !== updatedFood.id ? f : updatedFood));
      setFoods(updatedFoods);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number): Promise<void> {
    await api.delete(`/foods/${id}`);

    const filteredFoods = foods.filter(food => food.id !== id);
    setFoods(filteredFoods);
  }

  function toggleModal(): void {
    setModalOpen(prevState => !prevState);
  }

  function toggleEditModal(): void {
    setEditModalOpen(prevState => !prevState);
  }

  function handleEditFood(food: IFood): void {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood isOpen={modalOpen} setIsOpen={toggleModal} handleAddFood={handleAddFood} />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
