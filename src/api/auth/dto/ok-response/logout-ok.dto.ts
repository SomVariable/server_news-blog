import { ApiProperty } from "@nestjs/swagger";
import { SESSION_EXAMPLE } from "src/api/kv-store/constants/kv-store.constants";
import { Session } from "src/api/kv-store/kv-types/kv-store.type";

export class LogoutOkDto {
  @ApiProperty({example: SESSION_EXAMPLE})
  data: Session
}