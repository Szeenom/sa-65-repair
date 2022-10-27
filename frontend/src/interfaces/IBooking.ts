import { RoomInterface } from "./IRoom";
import { StudentInterface } from "./IStudent";
import { TimeInterface } from "./ITime";

export interface BookingInterface {
  ID?: number;
  Check_in_date: Date | null;
  Room_id?: number;
  Room?: RoomInterface;
  STUDENT_ID?: number;
  Student?: StudentInterface;
  TimeID?: number;
  Time?: TimeInterface;

}