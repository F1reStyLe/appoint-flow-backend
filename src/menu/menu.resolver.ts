import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MenuService } from './menu.service';
import { MenuModel } from './menu.model';
import { createMenuDto, updateMenuDto } from './menu.dto';

@Resolver()
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}


  @Query(() => [MenuModel], { name: 'menu' })
  getAllMenu() {
    return this.menuService.getAllFromMenu();
  }

  @Mutation(() => MenuModel, { name: 'createMenu' })
  async createMenu(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('image', { nullable: true } ) image?: string,
    @Args('description', { nullable: true } ) description?: string,
  ) {
    const createMenuData: createMenuDto = {
      name,
      price,
      image: image?.length ? image : '',
      description: description?.length? description : '',
    };

    return this.menuService.createMenu(createMenuData);
  }

  @Mutation(() => MenuModel, { name: 'updateMenu' })
  async updateMenu(
    @Args('id') id: number,
    @Args('name', { nullable: true } ) name?: string,
    @Args('price', { nullable: true } ) price?: number,
    @Args('image', { nullable: true } ) image?: string,
    @Args('description', { nullable: true } ) description?: string,
  ) {
    const updateMenuData: Partial<updateMenuDto> = { id };

    if (name) updateMenuData.name = name;
    if (price) updateMenuData.price = price;
    if (image) updateMenuData.image = image;
    if (description) updateMenuData.description = description;

    return this.menuService.updateMenu(id, updateMenuData);
  }

  @Mutation(() => [MenuModel], { name: 'deleteMenu' })
  async deleteMenu(@Args({name: 'ids', type: () => [Number]}) ids: number[]) {
    return this.menuService.deleteMenu(ids);
  }
}
