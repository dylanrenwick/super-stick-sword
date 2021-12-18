package xyz.skidsdev.supersticksword;

import net.minecraft.item.ToolMaterial;
import net.minecraft.recipe.Ingredient;

public class StickToolMaterial implements ToolMaterial {
    public static final StickToolMaterial INSTANCE = new StickToolMaterial();

    @Override
    public int getDurability() {
        return 2500;
    }

    @Override
    public float getMiningSpeedMultiplier() {
        return 2;
    }

    @Override
    public float getAttackDamage() {
        return 10;
    }

    @Override
    public int getMiningLevel() {
        return 1;
    }

    @Override
    public int getEnchantability() {
        return 20;
    }

    @Override
    public Ingredient getRepairIngredient() {
        return Ingredient.ofItems(SuperStickSword.ITEMS.get(SuperStickSword.ITEMS.size() - 1));
    }
}
