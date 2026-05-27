import type { ComponentType } from "react"

import accordion_controlled from "./default/examples/accordion-controlled"
import accordion_demo from "./default/examples/accordion-demo"
import accordion_multiple from "./default/examples/accordion-multiple"
import accordion_single from "./default/examples/accordion-single"
import alert_demo from "./default/examples/alert-demo"
import alert_dialog_demo from "./default/examples/alert-dialog-demo"
import alert_error from "./default/examples/alert-error"
import alert_info from "./default/examples/alert-info"
import alert_success from "./default/examples/alert-success"
import alert_warning from "./default/examples/alert-warning"
import alert_with_icon from "./default/examples/alert-with-icon"
import alert_with_icon_action from "./default/examples/alert-with-icon-action"
import autocomplete_async from "./default/examples/autocomplete-async"
import autocomplete_autohighlight from "./default/examples/autocomplete-autohighlight"
import autocomplete_demo from "./default/examples/autocomplete-demo"
import autocomplete_disabled from "./default/examples/autocomplete-disabled"
import autocomplete_form from "./default/examples/autocomplete-form"
import autocomplete_grouped from "./default/examples/autocomplete-grouped"
import autocomplete_inline from "./default/examples/autocomplete-inline"
import autocomplete_lg from "./default/examples/autocomplete-lg"
import autocomplete_limit from "./default/examples/autocomplete-limit"
import autocomplete_sm from "./default/examples/autocomplete-sm"
import autocomplete_with_clear from "./default/examples/autocomplete-with-clear"
import autocomplete_with_label from "./default/examples/autocomplete-with-label"
import autocomplete_with_trigger_clear from "./default/examples/autocomplete-with-trigger-clear"
import avatar_demo from "./default/examples/avatar-demo"
import avatar_fallback from "./default/examples/avatar-fallback"
import avatar_group from "./default/examples/avatar-group"
import avatar_radius from "./default/examples/avatar-radius"
import avatar_size from "./default/examples/avatar-size"
import badge_demo from "./default/examples/badge-demo"
import badge_destructive from "./default/examples/badge-destructive"
import badge_error from "./default/examples/badge-error"
import badge_info from "./default/examples/badge-info"
import badge_lg from "./default/examples/badge-lg"
import badge_outline from "./default/examples/badge-outline"
import badge_secondary from "./default/examples/badge-secondary"
import badge_sm from "./default/examples/badge-sm"
import badge_success from "./default/examples/badge-success"
import badge_warning from "./default/examples/badge-warning"
import badge_with_icon from "./default/examples/badge-with-icon"
import badge_with_link from "./default/examples/badge-with-link"
import breadcrumb_custom_separator from "./default/examples/breadcrumb-custom-separator"
import breadcrumb_demo from "./default/examples/breadcrumb-demo"
import button_demo from "./default/examples/button-demo"
import button_destructive from "./default/examples/button-destructive"
import button_destructive_outline from "./default/examples/button-destructive-outline"
import button_disabled from "./default/examples/button-disabled"
import button_ghost from "./default/examples/button-ghost"
import button_icon from "./default/examples/button-icon"
import button_icon_lg from "./default/examples/button-icon-lg"
import button_icon_sm from "./default/examples/button-icon-sm"
import button_lg from "./default/examples/button-lg"
import button_link from "./default/examples/button-link"
import button_loading from "./default/examples/button-loading"
import button_outline from "./default/examples/button-outline"
import button_secondary from "./default/examples/button-secondary"
import button_sm from "./default/examples/button-sm"
import button_with_icon from "./default/examples/button-with-icon"
import button_with_link from "./default/examples/button-with-link"
import button_xl from "./default/examples/button-xl"
import button_xs from "./default/examples/button-xs"
import card_demo from "./default/examples/card-demo"
import checkbox_card from "./default/examples/checkbox-card"
import checkbox_demo from "./default/examples/checkbox-demo"
import checkbox_disabled from "./default/examples/checkbox-disabled"
import checkbox_form from "./default/examples/checkbox-form"
import checkbox_group_demo from "./default/examples/checkbox-group-demo"
import checkbox_group_disabled from "./default/examples/checkbox-group-disabled"
import checkbox_group_form from "./default/examples/checkbox-group-form"
import checkbox_group_nested_parent from "./default/examples/checkbox-group-nested-parent"
import checkbox_group_parent from "./default/examples/checkbox-group-parent"
import checkbox_with_description from "./default/examples/checkbox-with-description"
import code_block from "./default/examples/code-block"
import code_block_diff from "./default/examples/code-block-diff"
import code_block_focus from "./default/examples/code-block-focus"
import code_block_headless from "./default/examples/code-block-headless"
import code_block_highlight_line from "./default/examples/code-block-highlight-line"
import code_block_highlight_word from "./default/examples/code-block-highlight-word"
import code_block_no_highlighting from "./default/examples/code-block-no-highlighting"
import code_block_numberless from "./default/examples/code-block-numberless"
import code_block_theme from "./default/examples/code-block-theme"
import collapsible_demo from "./default/examples/collapsible-demo"
import combobox_autohighlight from "./default/examples/combobox-autohighlight"
import combobox_demo from "./default/examples/combobox-demo"
import combobox_disabled from "./default/examples/combobox-disabled"
import combobox_form from "./default/examples/combobox-form"
import combobox_grouped from "./default/examples/combobox-grouped"
import combobox_lg from "./default/examples/combobox-lg"
import combobox_multiple from "./default/examples/combobox-multiple"
import combobox_multiple_form from "./default/examples/combobox-multiple-form"
import combobox_sm from "./default/examples/combobox-sm"
import combobox_with_clear from "./default/examples/combobox-with-clear"
import combobox_with_inner_input from "./default/examples/combobox-with-inner-input"
import combobox_with_label from "./default/examples/combobox-with-label"
import dialog_close_confirmation from "./default/examples/dialog-close-confirmation"
import dialog_demo from "./default/examples/dialog-demo"
import dialog_from_menu from "./default/examples/dialog-from-menu"
import dialog_nested from "./default/examples/dialog-nested"
import empty_demo from "./default/examples/empty-demo"
import field_autocomplete from "./default/examples/field-autocomplete"
import field_checkbox from "./default/examples/field-checkbox"
import field_checkbox_group from "./default/examples/field-checkbox-group"
import field_combobox from "./default/examples/field-combobox"
import field_combobox_multiple from "./default/examples/field-combobox-multiple"
import field_complete_form from "./default/examples/field-complete-form"
import field_demo from "./default/examples/field-demo"
import field_disabled from "./default/examples/field-disabled"
import field_error from "./default/examples/field-error"
import field_number_field from "./default/examples/field-number-field"
import field_radio from "./default/examples/field-radio"
import field_required from "./default/examples/field-required"
import field_select from "./default/examples/field-select"
import field_slider from "./default/examples/field-slider"
import field_switch from "./default/examples/field-switch"
import field_textarea from "./default/examples/field-textarea"
import field_validity from "./default/examples/field-validity"
import fieldset_demo from "./default/examples/fieldset-demo"
import form_demo from "./default/examples/form-demo"
import form_zod from "./default/examples/form-zod"
import frame_demo from "./default/examples/frame-demo"
import group_demo from "./default/examples/group-demo"
import group_with_input from "./default/examples/group-with-input"
import input_demo from "./default/examples/input-demo"
import input_disabled from "./default/examples/input-disabled"
import input_file from "./default/examples/input-file"
import input_lg from "./default/examples/input-lg"
import input_sm from "./default/examples/input-sm"
import input_with_button from "./default/examples/input-with-button"
import input_with_label from "./default/examples/input-with-label"
import menu_checkbox from "./default/examples/menu-checkbox"
import menu_close_on_click from "./default/examples/menu-close-on-click"
import menu_demo from "./default/examples/menu-demo"
import menu_group_labels from "./default/examples/menu-group-labels"
import menu_hover from "./default/examples/menu-hover"
import menu_link from "./default/examples/menu-link"
import menu_nested from "./default/examples/menu-nested"
import menu_radio_group from "./default/examples/menu-radio-group"
import meter_demo from "./default/examples/meter-demo"
import meter_simple from "./default/examples/meter-simple"
import meter_with_formatted_value from "./default/examples/meter-with-formatted-value"
import meter_with_range from "./default/examples/meter-with-range"
import number_field_demo from "./default/examples/number-field-demo"
import number_field_disabled from "./default/examples/number-field-disabled"
import number_field_form from "./default/examples/number-field-form"
import number_field_lg from "./default/examples/number-field-lg"
import number_field_sm from "./default/examples/number-field-sm"
import number_field_with_formatted_value from "./default/examples/number-field-with-formatted-value"
import number_field_with_label from "./default/examples/number-field-with-label"
import number_field_with_range from "./default/examples/number-field-with-range"
import number_field_with_scrub from "./default/examples/number-field-with-scrub"
import number_field_with_step from "./default/examples/number-field-with-step"
import pagination_demo from "./default/examples/pagination-demo"
import popover_demo from "./default/examples/popover-demo"
import popover_with_close from "./default/examples/popover-with-close"
import preview_card_demo from "./default/examples/preview-card-demo"
import progress_demo from "./default/examples/progress-demo"
import progress_with_formatted_value from "./default/examples/progress-with-formatted-value"
import progress_with_label_value from "./default/examples/progress-with-label-value"
import radio_group_card from "./default/examples/radio-group-card"
import radio_group_demo from "./default/examples/radio-group-demo"
import radio_group_disabled from "./default/examples/radio-group-disabled"
import radio_group_form from "./default/examples/radio-group-form"
import radio_group_with_description from "./default/examples/radio-group-with-description"
import scroll_area_both from "./default/examples/scroll-area-both"
import scroll_area_demo from "./default/examples/scroll-area-demo"
import scroll_area_horizontal from "./default/examples/scroll-area-horizontal"
import select_demo from "./default/examples/select-demo"
import select_disabled from "./default/examples/select-disabled"
import select_form from "./default/examples/select-form"
import select_lg from "./default/examples/select-lg"
import select_multiple from "./default/examples/select-multiple"
import select_sm from "./default/examples/select-sm"
import select_with_groups from "./default/examples/select-with-groups"
import select_without_alignment from "./default/examples/select-without-alignment"
import separator_demo from "./default/examples/separator-demo"
import sheet_demo from "./default/examples/sheet-demo"
import sheet_position from "./default/examples/sheet-position"
import skeleton_demo from "./default/examples/skeleton-demo"
import skeleton_only from "./default/examples/skeleton-only"
import slider_demo from "./default/examples/slider-demo"
import slider_form from "./default/examples/slider-form"
import slider_range from "./default/examples/slider-range"
import slider_vertical from "./default/examples/slider-vertical"
import slider_with_label_value from "./default/examples/slider-with-label-value"
import switch_card from "./default/examples/switch-card"
import switch_demo from "./default/examples/switch-demo"
import switch_disabled from "./default/examples/switch-disabled"
import switch_form from "./default/examples/switch-form"
import switch_with_description from "./default/examples/switch-with-description"
import table_demo from "./default/examples/table-demo"
import table_framed from "./default/examples/table-framed"
import tabs_demo from "./default/examples/tabs-demo"
import tabs_underline from "./default/examples/tabs-underline"
import tabs_underline_vertical from "./default/examples/tabs-underline-vertical"
import tabs_vertical from "./default/examples/tabs-vertical"
import textarea_demo from "./default/examples/textarea-demo"
import textarea_disabled from "./default/examples/textarea-disabled"
import textarea_form from "./default/examples/textarea-form"
import textarea_lg from "./default/examples/textarea-lg"
import textarea_sm from "./default/examples/textarea-sm"
import textarea_with_label from "./default/examples/textarea-with-label"
import toast_demo from "./default/examples/toast-demo"
import toast_heights from "./default/examples/toast-heights"
import toast_loading from "./default/examples/toast-loading"
import toast_promise from "./default/examples/toast-promise"
import toast_with_action from "./default/examples/toast-with-action"
import toast_with_status from "./default/examples/toast-with-status"
import toggle_demo from "./default/examples/toggle-demo"
import toggle_disabled from "./default/examples/toggle-disabled"
import toggle_group_demo from "./default/examples/toggle-group-demo"
import toggle_group_disabled from "./default/examples/toggle-group-disabled"
import toggle_group_lg from "./default/examples/toggle-group-lg"
import toggle_group_multiple from "./default/examples/toggle-group-multiple"
import toggle_group_outline from "./default/examples/toggle-group-outline"
import toggle_group_outline_with_separator from "./default/examples/toggle-group-outline-with-separator"
import toggle_group_sm from "./default/examples/toggle-group-sm"
import toggle_group_with_disabled_item from "./default/examples/toggle-group-with-disabled-item"
import toggle_icon_group from "./default/examples/toggle-icon-group"
import toggle_lg from "./default/examples/toggle-lg"
import toggle_outline from "./default/examples/toggle-outline"
import toggle_sm from "./default/examples/toggle-sm"
import toggle_with_icon from "./default/examples/toggle-with-icon"
import toolbar_demo from "./default/examples/toolbar-demo"
import tooltip_demo from "./default/examples/tooltip-demo"
import tooltip_grouped from "./default/examples/tooltip-grouped"

export const Index: Record<string, { component: ComponentType }> = {
  "accordion-controlled": { component: accordion_controlled },
  "accordion-demo": { component: accordion_demo },
  "accordion-multiple": { component: accordion_multiple },
  "accordion-single": { component: accordion_single },
  "alert-demo": { component: alert_demo },
  "alert-dialog-demo": { component: alert_dialog_demo },
  "alert-error": { component: alert_error },
  "alert-info": { component: alert_info },
  "alert-success": { component: alert_success },
  "alert-warning": { component: alert_warning },
  "alert-with-icon": { component: alert_with_icon },
  "alert-with-icon-action": { component: alert_with_icon_action },
  "autocomplete-async": { component: autocomplete_async },
  "autocomplete-autohighlight": { component: autocomplete_autohighlight },
  "autocomplete-demo": { component: autocomplete_demo },
  "autocomplete-disabled": { component: autocomplete_disabled },
  "autocomplete-form": { component: autocomplete_form },
  "autocomplete-grouped": { component: autocomplete_grouped },
  "autocomplete-inline": { component: autocomplete_inline },
  "autocomplete-lg": { component: autocomplete_lg },
  "autocomplete-limit": { component: autocomplete_limit },
  "autocomplete-sm": { component: autocomplete_sm },
  "autocomplete-with-clear": { component: autocomplete_with_clear },
  "autocomplete-with-label": { component: autocomplete_with_label },
  "autocomplete-with-trigger-clear": { component: autocomplete_with_trigger_clear },
  "avatar-demo": { component: avatar_demo },
  "avatar-fallback": { component: avatar_fallback },
  "avatar-group": { component: avatar_group },
  "avatar-radius": { component: avatar_radius },
  "avatar-size": { component: avatar_size },
  "badge-demo": { component: badge_demo },
  "badge-destructive": { component: badge_destructive },
  "badge-error": { component: badge_error },
  "badge-info": { component: badge_info },
  "badge-lg": { component: badge_lg },
  "badge-outline": { component: badge_outline },
  "badge-secondary": { component: badge_secondary },
  "badge-sm": { component: badge_sm },
  "badge-success": { component: badge_success },
  "badge-warning": { component: badge_warning },
  "badge-with-icon": { component: badge_with_icon },
  "badge-with-link": { component: badge_with_link },
  "breadcrumb-custom-separator": { component: breadcrumb_custom_separator },
  "breadcrumb-demo": { component: breadcrumb_demo },
  "button-demo": { component: button_demo },
  "button-destructive": { component: button_destructive },
  "button-destructive-outline": { component: button_destructive_outline },
  "button-disabled": { component: button_disabled },
  "button-ghost": { component: button_ghost },
  "button-icon": { component: button_icon },
  "button-icon-lg": { component: button_icon_lg },
  "button-icon-sm": { component: button_icon_sm },
  "button-lg": { component: button_lg },
  "button-link": { component: button_link },
  "button-loading": { component: button_loading },
  "button-outline": { component: button_outline },
  "button-secondary": { component: button_secondary },
  "button-sm": { component: button_sm },
  "button-with-icon": { component: button_with_icon },
  "button-with-link": { component: button_with_link },
  "button-xl": { component: button_xl },
  "button-xs": { component: button_xs },
  "card-demo": { component: card_demo },
  "checkbox-card": { component: checkbox_card },
  "checkbox-demo": { component: checkbox_demo },
  "checkbox-disabled": { component: checkbox_disabled },
  "checkbox-form": { component: checkbox_form },
  "checkbox-group-demo": { component: checkbox_group_demo },
  "checkbox-group-disabled": { component: checkbox_group_disabled },
  "checkbox-group-form": { component: checkbox_group_form },
  "checkbox-group-nested-parent": { component: checkbox_group_nested_parent },
  "checkbox-group-parent": { component: checkbox_group_parent },
  "checkbox-with-description": { component: checkbox_with_description },
  "code-block": { component: code_block },
  "code-block-diff": { component: code_block_diff },
  "code-block-focus": { component: code_block_focus },
  "code-block-headless": { component: code_block_headless },
  "code-block-highlight-line": { component: code_block_highlight_line },
  "code-block-highlight-word": { component: code_block_highlight_word },
  "code-block-no-highlighting": { component: code_block_no_highlighting },
  "code-block-numberless": { component: code_block_numberless },
  "code-block-theme": { component: code_block_theme },
  "collapsible-demo": { component: collapsible_demo },
  "combobox-autohighlight": { component: combobox_autohighlight },
  "combobox-demo": { component: combobox_demo },
  "combobox-disabled": { component: combobox_disabled },
  "combobox-form": { component: combobox_form },
  "combobox-grouped": { component: combobox_grouped },
  "combobox-lg": { component: combobox_lg },
  "combobox-multiple": { component: combobox_multiple },
  "combobox-multiple-form": { component: combobox_multiple_form },
  "combobox-sm": { component: combobox_sm },
  "combobox-with-clear": { component: combobox_with_clear },
  "combobox-with-inner-input": { component: combobox_with_inner_input },
  "combobox-with-label": { component: combobox_with_label },
  "dialog-close-confirmation": { component: dialog_close_confirmation },
  "dialog-demo": { component: dialog_demo },
  "dialog-from-menu": { component: dialog_from_menu },
  "dialog-nested": { component: dialog_nested },
  "empty-demo": { component: empty_demo },
  "field-autocomplete": { component: field_autocomplete },
  "field-checkbox": { component: field_checkbox },
  "field-checkbox-group": { component: field_checkbox_group },
  "field-combobox": { component: field_combobox },
  "field-combobox-multiple": { component: field_combobox_multiple },
  "field-complete-form": { component: field_complete_form },
  "field-demo": { component: field_demo },
  "field-disabled": { component: field_disabled },
  "field-error": { component: field_error },
  "field-number-field": { component: field_number_field },
  "field-radio": { component: field_radio },
  "field-required": { component: field_required },
  "field-select": { component: field_select },
  "field-slider": { component: field_slider },
  "field-switch": { component: field_switch },
  "field-textarea": { component: field_textarea },
  "field-validity": { component: field_validity },
  "fieldset-demo": { component: fieldset_demo },
  "form-demo": { component: form_demo },
  "form-zod": { component: form_zod },
  "frame-demo": { component: frame_demo },
  "group-demo": { component: group_demo },
  "group-with-input": { component: group_with_input },
  "input-demo": { component: input_demo },
  "input-disabled": { component: input_disabled },
  "input-file": { component: input_file },
  "input-lg": { component: input_lg },
  "input-sm": { component: input_sm },
  "input-with-button": { component: input_with_button },
  "input-with-label": { component: input_with_label },
  "menu-checkbox": { component: menu_checkbox },
  "menu-close-on-click": { component: menu_close_on_click },
  "menu-demo": { component: menu_demo },
  "menu-group-labels": { component: menu_group_labels },
  "menu-hover": { component: menu_hover },
  "menu-link": { component: menu_link },
  "menu-nested": { component: menu_nested },
  "menu-radio-group": { component: menu_radio_group },
  "meter-demo": { component: meter_demo },
  "meter-simple": { component: meter_simple },
  "meter-with-formatted-value": { component: meter_with_formatted_value },
  "meter-with-range": { component: meter_with_range },
  "number-field-demo": { component: number_field_demo },
  "number-field-disabled": { component: number_field_disabled },
  "number-field-form": { component: number_field_form },
  "number-field-lg": { component: number_field_lg },
  "number-field-sm": { component: number_field_sm },
  "number-field-with-formatted-value": { component: number_field_with_formatted_value },
  "number-field-with-label": { component: number_field_with_label },
  "number-field-with-range": { component: number_field_with_range },
  "number-field-with-scrub": { component: number_field_with_scrub },
  "number-field-with-step": { component: number_field_with_step },
  "pagination-demo": { component: pagination_demo },
  "popover-demo": { component: popover_demo },
  "popover-with-close": { component: popover_with_close },
  "preview-card-demo": { component: preview_card_demo },
  "progress-demo": { component: progress_demo },
  "progress-with-formatted-value": { component: progress_with_formatted_value },
  "progress-with-label-value": { component: progress_with_label_value },
  "radio-group-card": { component: radio_group_card },
  "radio-group-demo": { component: radio_group_demo },
  "radio-group-disabled": { component: radio_group_disabled },
  "radio-group-form": { component: radio_group_form },
  "radio-group-with-description": { component: radio_group_with_description },
  "scroll-area-both": { component: scroll_area_both },
  "scroll-area-demo": { component: scroll_area_demo },
  "scroll-area-horizontal": { component: scroll_area_horizontal },
  "select-demo": { component: select_demo },
  "select-disabled": { component: select_disabled },
  "select-form": { component: select_form },
  "select-lg": { component: select_lg },
  "select-multiple": { component: select_multiple },
  "select-sm": { component: select_sm },
  "select-with-groups": { component: select_with_groups },
  "select-without-alignment": { component: select_without_alignment },
  "separator-demo": { component: separator_demo },
  "sheet-demo": { component: sheet_demo },
  "sheet-position": { component: sheet_position },
  "skeleton-demo": { component: skeleton_demo },
  "skeleton-only": { component: skeleton_only },
  "slider-demo": { component: slider_demo },
  "slider-form": { component: slider_form },
  "slider-range": { component: slider_range },
  "slider-vertical": { component: slider_vertical },
  "slider-with-label-value": { component: slider_with_label_value },
  "switch-card": { component: switch_card },
  "switch-demo": { component: switch_demo },
  "switch-disabled": { component: switch_disabled },
  "switch-form": { component: switch_form },
  "switch-with-description": { component: switch_with_description },
  "table-demo": { component: table_demo },
  "table-framed": { component: table_framed },
  "tabs-demo": { component: tabs_demo },
  "tabs-underline": { component: tabs_underline },
  "tabs-underline-vertical": { component: tabs_underline_vertical },
  "tabs-vertical": { component: tabs_vertical },
  "textarea-demo": { component: textarea_demo },
  "textarea-disabled": { component: textarea_disabled },
  "textarea-form": { component: textarea_form },
  "textarea-lg": { component: textarea_lg },
  "textarea-sm": { component: textarea_sm },
  "textarea-with-label": { component: textarea_with_label },
  "toast-demo": { component: toast_demo },
  "toast-heights": { component: toast_heights },
  "toast-loading": { component: toast_loading },
  "toast-promise": { component: toast_promise },
  "toast-with-action": { component: toast_with_action },
  "toast-with-status": { component: toast_with_status },
  "toggle-demo": { component: toggle_demo },
  "toggle-disabled": { component: toggle_disabled },
  "toggle-group-demo": { component: toggle_group_demo },
  "toggle-group-disabled": { component: toggle_group_disabled },
  "toggle-group-lg": { component: toggle_group_lg },
  "toggle-group-multiple": { component: toggle_group_multiple },
  "toggle-group-outline": { component: toggle_group_outline },
  "toggle-group-outline-with-separator": { component: toggle_group_outline_with_separator },
  "toggle-group-sm": { component: toggle_group_sm },
  "toggle-group-with-disabled-item": { component: toggle_group_with_disabled_item },
  "toggle-icon-group": { component: toggle_icon_group },
  "toggle-lg": { component: toggle_lg },
  "toggle-outline": { component: toggle_outline },
  "toggle-sm": { component: toggle_sm },
  "toggle-with-icon": { component: toggle_with_icon },
  "toolbar-demo": { component: toolbar_demo },
  "tooltip-demo": { component: tooltip_demo },
  "tooltip-grouped": { component: tooltip_grouped },
}
