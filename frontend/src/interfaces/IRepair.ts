import { RoomInterface } from "./IRoom";
import { StudentInterface } from "./IStudent";
import { FurnitureInterface } from "./IFurniture";
export interface RepairInterface {
    ID?: number;
    Comment? : string;
    Room_id?: number;
    Room?: RoomInterface;
    STUDENT_ID?: number;
    Student?: StudentInterface;
    Furniture_id?: number;
    Furniture?: FurnitureInterface;
  
  }