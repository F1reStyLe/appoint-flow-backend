import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { RoleModel } from './role.model';
import { createRoleDto, RoleDto } from './role.dto';

@Resolver()
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => [RoleModel], { name: 'roles' })
  async getRoles(): Promise<RoleModel[]> {
    return this.roleService.getRoles();
  }

  @Query(() => RoleModel, { name: 'role' })
  async getRole(
    @Args('getRoleDto') getRoleDto: RoleDto
  ): Promise<RoleModel> {

    const getRoleData: Partial<RoleDto> = {};
    if (getRoleDto.id) getRoleData.id = getRoleDto.id;
    if (getRoleDto.name) getRoleData.name = getRoleDto.name.trim().toUpperCase();

    return this.roleService.getRole(getRoleData);
  }

  @Mutation(() => RoleModel, { name: 'createRole' })
  async createRole(
    @Args('createRoleDto') createRoleDto: createRoleDto
  ): Promise<RoleModel> {
    createRoleDto.name = createRoleDto.name.trim().toUpperCase();

    return this.roleService.createRole(createRoleDto);
  }

  @Mutation(() => RoleModel, { name: 'updateRole' })
  async updateRole(
    @Args('updateRoleDto') updateRoleDto: RoleDto
  ): Promise<RoleModel> {
    const changeRoleData: Partial<RoleDto> = {};

    const roleId = await this.checkRole(updateRoleDto);

    if (updateRoleDto.name) { changeRoleData.name = updateRoleDto.name.trim().toUpperCase(); }
    if (updateRoleDto.permissions) { changeRoleData.permissions = updateRoleDto.permissions; }

    return this.roleService.updateRole(roleId, changeRoleData)
  }

  @Mutation(() => RoleModel, { name: 'deleteRole' })
  async deleteRole(
    @Args('RoleDto') deleteRoleDto: RoleDto
  ): Promise<RoleModel> {
    const roleId = await this.checkRole(deleteRoleDto);

    return this.roleService.deleteRole(roleId);
  }

  async checkRole(dto: RoleDto): Promise<number|never> {
    if (!dto.name && !dto.id) {
      throw new Error('Invalid data, please provide a valid id or name');
    }

    const roleId = await this.getRole( dto );
    if (!roleId) { throw new Error('Role not found'); }

    return roleId.id;
  }
}