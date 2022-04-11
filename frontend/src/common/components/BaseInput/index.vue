<template>
  <div class="input-group">
    <label :for="id" v-if="label" class="label">{{ label }}</label>

    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :autocomplete="autocomplete ? 'on' : 'off'"
      @input="updateInput"
      @focus="onFocus"
      class="input"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",

  inheritAttrs: false,
  data() {
    return {
      focused: false,
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    icon: {
      type: String,
      required: false,
    },
    autocomplete: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: false,
    },
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    onFocus(value) {
      this.focused = value ? true : false;
      this.$emit("focus", value);
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />