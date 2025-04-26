export type Video = {
    "aigc_history_id": "",
    "aigc_item_id": "",
    "aigc_type": "none",
    "audio_fade": null,
    "beauty_body_preset_id": "",
    "beauty_face_auto_preset": {
        "name": "",
        "preset_id": "",
        "rate_map": ""
    },
    "beauty_face_auto_preset_infos": [],
    "beauty_face_preset_infos": [],
    "cartoon_path": "",
    "category_id": "",
    "category_name": "local",
    "check_flag": 62978047,
    "crop": {
        "lower_left_x": 0.0,
        "lower_left_y": 1.0,
        "lower_right_x": 1.0,
        "lower_right_y": 1.0,
        "upper_left_x": 0.0,
        "upper_left_y": 0.0,
        "upper_right_x": 1.0,
        "upper_right_y": 0.0
    },
    "crop_ratio": "free",
    "crop_scale": 1.0,
    "duration": 22800000,
    "extra_type_option": 0,
    "formula_id": "",
    "freeze": null,
    "has_audio": true,
    "has_sound_separated": false,
    "height": 2160,
    "id": string,
    "intensifies_audio_path": "",
    "intensifies_path": "",
    "is_ai_generate_content": false,
    "is_copyright": false,
    "is_text_edit_overdub": false,
    "is_unified_beauty_mode": false,
    "live_photo_cover_path": "",
    "live_photo_timestamp": -1,
    "local_id": "",
    "local_material_from": "",
    "local_material_id": string,
    "material_id": "",
    "material_name": string,
    "material_url": "",
    "matting": {
        "custom_matting_id": "",
        "enable_matting_stroke": false,
        "expansion": 0,
        "feather": 0,
        "flag": 0,
        "has_use_quick_brush": false,
        "has_use_quick_eraser": false,
        "interactiveTime": [],
        "path": "",
        "reverse": false,
        "strokes": []
    },
    "media_path": "",
    "multi_camera_info": null,
    "object_locked": null,
    "origin_material_id": "",
    "path": string,
    "picture_from": "none",
    "picture_set_category_id": "",
    "picture_set_category_name": "",
    "request_id": "",
    "reverse_intensifies_path": "",
    "reverse_path": "",
    "smart_match_info": null,
    "smart_motion": null,
    "source": 0,
    "source_platform": 0,
    "stable": {
        "matrix_path": "",
        "stable_level": 0,
        "time_range": {
            "duration": 0,
            "start": 0
        }
    },
    "team_id": "",
    "type": "video",
    "video_algorithm": {
        "ai_background_configs": [],
        "ai_expression_driven": null,
        "ai_motion_driven": null,
        "aigc_generate": null,
        "algorithms": [],
        "complement_frame_config": null,
        "deflicker": null,
        "gameplay_configs": [],
        "motion_blur_config": null,
        "mouth_shape_driver": null,
        "noise_reduction": null,
        "path": "",
        "quality_enhance": null,
        "smart_complement_frame": null,
        "super_resolution": null,
        "time_range": null
    },
    "width": 3840
}

export type Track = {
    "attribute": 0,
    "flag": 0,
    "id": string,
    "is_default_name": true,
    "name": "",
    'segments': Segment[],
    "type": "video"
}

export type Segment = {
    "caption_info": null,
    "cartoon": false,
    "clip": {
        "alpha": 1.0,
        "flip": {
            "horizontal": false,
            "vertical": false
        },
        "rotation": 0.0,
        "scale": {
            "x": 1.0,
            "y": 1.0
        },
        "transform": {
            "x": 0.0,
            "y": 0.0
        }
    },
    "color_correct_alg_result": "",
    "common_keyframes": [],
    "desc": "",
    "digital_human_template_group_id": "",
    "enable_adjust": true,
    "enable_adjust_mask": false,
    "enable_color_correct_adjust": false,
    "enable_color_curves": true,
    "enable_color_match_adjust": false,
    "enable_color_wheels": true,
    "enable_hsl": false,
    "enable_lut": true,
    "enable_smart_color_adjust": false,
    "enable_video_mask": true,
    "extra_material_refs": string[] | [],
    "group_id": "",
    "hdr_settings": {
        "intensity": 1.0,
        "mode": 1,
        "nits": 1000
    },
    "id": string,
    "intensifies_audio": false,
    "is_loop": false,
    "is_placeholder": false,
    "is_tone_modify": false,
    "keyframe_refs": [],
    "last_nonzero_volume": 1.0,
    "lyric_keyframes": null,
    "material_id": string, // video id
    "raw_segment_id": "",
    "render_index": 0,
    "render_timerange": {
        "duration": 0,
        "start": 0
    },
    "responsive_layout": {
        "enable": false,
        "horizontal_pos_layout": 0,
        "size_layout": 0,
        "target_follow": "",
        "vertical_pos_layout": 0
    },
    "reverse": false,
    "source_timerange": {
        "duration": 22800000,
        "start": 0
    },
    "speed": 1.0,
    "state": 0,
    "target_timerange": {
        "duration": number,
        "start": number
    },
    "template_id": "",
    "template_scene": "default",
    "track_attribute": 0,
    "track_render_index": 0,
    "uniform_scale": {
        "on": true,
        "value": 1.0
    },
    "visible": true,
    "volume": 1.0
}